import { Request, Response } from "express";
import { HackathonStatus } from "../enums/HackathonStatus";
import { ParticipatingTeamStatus } from "../enums/ParticipatingTeamStatus";
import { AddModeratorInput } from "../models/hackathon";
import { CreateParticipatingTeamInput } from "../models/participating-team";
import { UserTokenDetails } from "../models/user";
import { generateRandomString } from "../utilities/RandomStringGenerator";
import { mapObject } from "../utilities/RemoveUnderscoreId";
import Hackathon from "./../schemas/hackathon";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const body: CreateParticipatingTeamInput = req.body;
    const userDetails: UserTokenDetails = JSON.parse(
      req.headers["user"] as string
    );
    const hackathonId = req.params.hackathonId;
    const hackathon = await Hackathon.findOne({ _id: hackathonId });
    if (!hackathon) {
      res.status(404).json({ message: "Hackathon not found" });
      return;
    }
    if (hackathon.status !== HackathonStatus.REGISTRATION_STARTED) {
      res
        .status(403)
        .json({ message: "Hackathon is not accepting registration" });
      return;
    }
    const userAlreadyInHackathon = hackathon.participatingTeams.find(
      (team) =>
        team.users.includes(userDetails.id) ||
        team.teamLeaderId === userDetails.id
    );
    if (userAlreadyInHackathon) {
      res
        .status(403)
        .json({ message: "You are already in a team for this hackathon" });
      return;
    }
    const isModerator = hackathon.moderators.includes(userDetails.id);
    if (isModerator) {
      res.status(403).json({ message: "Moderators cannot participate" });
      return;
    }
    let teamCode = generateRandomString(8);
    while (
      hackathon.participatingTeams.find((team) => team.teamCode === teamCode)
    ) {
      teamCode = generateRandomString(8);
    }
    const timeMilli = new Date().getTime();
    const newTeam = {
      name: body.name,
      teamCode: teamCode,
      teamLeaderId: userDetails.id,
      status: ParticipatingTeamStatus.TEAM_FORMED,
      createdTime: timeMilli,
      updatedTime: timeMilli,
      users: [],
    };
    const updatedHackathon = await Hackathon.findOneAndUpdate(
      { _id: hackathonId },
      { $push: { participatingTeams: newTeam } },
      { new: true }
    );
    const createdTeam =
      updatedHackathon?.participatingTeams[
        updatedHackathon.participatingTeams.length - 1
      ];
    res.status(200).json(createdTeam);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const joinTeam = async (req: Request, res: Response) => {
  try {
    const userDetails: UserTokenDetails = JSON.parse(
      req.headers["user"] as string
    );
    const hackathonId = req.params.hackathonId;
    const teamCode = req.params.teamCode;
    const hackathon = await Hackathon.findOne({ _id: hackathonId });
    if (!hackathon) {
      res.status(404).json({ message: "Hackathon not found" });
      return;
    }
    if (hackathon.status !== HackathonStatus.REGISTRATION_STARTED) {
      res
        .status(403)
        .json({ message: "Hackathon is not accepting registration" });
      return;
    }
    const userAlreadyInHackathon = hackathon.participatingTeams.find(
      (team) =>
        team.users.includes(userDetails.id) ||
        team.teamLeaderId === userDetails.id
    );
    if (userAlreadyInHackathon) {
      res
        .status(403)
        .json({ message: "You are already in a team for this hackathon" });
      return;
    }
    const isModerator = hackathon.moderators.includes(userDetails.id);
    if (isModerator) {
      res.status(403).json({ message: "Moderators cannot participate" });
      return;
    }
    const team = hackathon.participatingTeams.find(
      (team) => team.teamCode === teamCode
    );
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    if (team.users.length + 1 === hackathon.maxParticipantCount) {
      res
        .status(403)
        .json({ message: "Team is already having max number of participant" });
      return;
    }
    if (team.status !== ParticipatingTeamStatus.TEAM_FORMED) {
      res.status(403).json({
        message:
          "Cannot add participant, this team has already applied for hackathon",
      });
      return;
    }
    await Hackathon.findOneAndUpdate(
      { _id: hackathonId, "participatingTeams.teamCode": teamCode },
      { $push: { "participatingTeams.$.users": userDetails.id } }
    );
    res.status(200).json({ message: "User added to team successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const addModerator = async (req: Request, res: Response) => {
  try {
    const body: AddModeratorInput = req.body;
    const userDetails: UserTokenDetails = JSON.parse(
      req.headers["user"] as string
    );
    const hackathonId = req.params.hackathonId;
    const hackathon = await Hackathon.findOne({ _id: hackathonId });
    if (!hackathon) {
      res.status(404).json({ message: "Hackathon not found" });
      return;
    }
    if (hackathon.organizerId !== userDetails.id) {
      res.status(401).json();
      return;
    }
    if (hackathon.moderators.includes(body.moderatorId)) {
      res.status(403).json({ message: "Moderator is already added" });
      return;
    }
    if (
      hackathon.participatingTeams.find(
        (team) =>
          team.users.includes(body.moderatorId) ||
          team.teamLeaderId === body.moderatorId
      )
    ) {
      res.status(403).json({
        message: "Moderator has already joined a team in this hackathon",
      });
      return;
    }
    const updatedHackathon = await Hackathon.findOneAndUpdate(
      { _id: hackathonId },
      { $push: { moderators: body.moderatorId } },
      { new: true }
    );
    res.status(200).json(mapObject(updatedHackathon));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const removeModerator = async (req: Request, res: Response) => {
  try {
    const body: AddModeratorInput = req.body;
    const userDetails: UserTokenDetails = JSON.parse(
      req.headers["user"] as string
    );
    const hackathonId = req.params.hackathonId;
    const hackathon = await Hackathon.findOne({ _id: hackathonId });
    if (!hackathon) {
      res.status(404).json({ message: "Hackathon not found" });
      return;
    }
    if (hackathon.organizerId !== userDetails.id) {
      res.status(401).json();
      return;
    }
    const updatedHackathon = await Hackathon.findOneAndUpdate(
      { _id: hackathonId },
      { $pull: { moderators: body.moderatorId } },
      { new: true }
    );
    res.status(200).json(mapObject(updatedHackathon));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const applyForHackathon = async (req: Request, res: Response) => {
  try {
    const userDetails: UserTokenDetails = JSON.parse(
      req.headers["user"] as string
    );
    const hackathonId = req.params.hackathonId;
    const teamId = req.params.teamId;
    const hackathon = await Hackathon.findOne({ _id: hackathonId });
    if (!hackathon) {
      res.status(404).json({ message: "Hackathon not found" });
      return;
    }
    const team = hackathon.participatingTeams.find(
      (team) => team.id === teamId
    );
    if (!team) {
      res.status(404).json({ message: "team not found" });
      return;
    }
    if (team.teamLeaderId !== userDetails.id) {
      res.status(401).json();
      return;
    }
    if (team.users.length + 1 < hackathon.minParticipantCount) {
      res.status(403).json({ message: "team is not eligible to participate" });
      return;
    }
    const timeMilli = new Date().getTime();
    const updatedHackathon = await Hackathon.findOneAndUpdate(
      { _id: hackathonId, "participatingTeams.id": teamId },
      {
        $set: {
          "participatingTeams.$.status": ParticipatingTeamStatus.APPLIED,
          "participatingTeams.$.updatedTime": timeMilli,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json(
        mapObject(
          updatedHackathon?.participatingTeams.find(
            (team) => team.id === teamId
          )
        )
      );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const approveTeamRequest = async (req: Request, res: Response) => {
  try {
    const userDetails: UserTokenDetails = JSON.parse(
      req.headers["user"] as string
    );
    const hackathonId = req.params.hackathonId;
    const teamId = req.params.teamId;
    const hackathon = await Hackathon.findOne({ _id: hackathonId });
    if (!hackathon) {
      res.status(404).json({ message: "Hackathon not found" });
      return;
    }
    if (hackathon.organizerId !== userDetails.id) {
      res.status(401).json();
      return;
    }
    const team = hackathon.participatingTeams.find(
      (team) => team.id === teamId
    );
    if (!team) {
      res.status(404).json({ message: "team not found" });
      return;
    }
    const timeMilli = new Date().getTime();
    const updatedHackathon = await Hackathon.findOneAndUpdate(
      { _id: hackathonId, "participatingTeams.id": teamId },
      {
        $set: {
          "participatingTeams.$.status": ParticipatingTeamStatus.ACCEPTED,
          "participatingTeams.$.updatedTime": timeMilli,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json(
        mapObject(
          updatedHackathon?.participatingTeams.find(
            (team) => team.id === teamId
          )
        )
      );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const rejectTeamRequest = async (req: Request, res: Response) => {
  try {
    const userDetails: UserTokenDetails = JSON.parse(
      req.headers["user"] as string
    );
    const hackathonId = req.params.hackathonId;
    const teamId = req.params.teamId;
    const hackathon = await Hackathon.findOne({ _id: hackathonId });
    if (!hackathon) {
      res.status(404).json({ message: "Hackathon not found" });
      return;
    }
    if (hackathon.organizerId !== userDetails.id) {
      res.status(401).json();
      return;
    }
    const team = hackathon.participatingTeams.find(
      (team) => team.id === teamId
    );
    if (!team) {
      res.status(404).json({ message: "team not found" });
      return;
    }
    const timeMilli = new Date().getTime();
    const updatedHackathon = await Hackathon.findOneAndUpdate(
      { _id: hackathonId, "participatingTeams.id": teamId },
      {
        $set: {
          "participatingTeams.$.status": ParticipatingTeamStatus.REJECTED,
          "participatingTeams.$.updatedTime": timeMilli,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json(
        mapObject(
          updatedHackathon?.participatingTeams.find(
            (team) => team.id === teamId
          )
        )
      );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
