import { Request, Response } from "express";
import { ParticipatingTeamStatus } from "../enums/ParticipatingTeamStatus";
import { AddModeratorInput } from "../models/hackathon";
import {
  CreateParticipatingTeamInput,
  JoinParticipatingTeamInput,
} from "../models/participating-team";
import { UserTokenDetails } from "../models/user";
import { generateRandomString } from "../utilities/RandomStringGenerator";
import { mapObject } from "../utilities/RemoveUnderscoreId";
import Hackathon from "./../schemas/hackathon";
import { updateHackathon } from "./hackathon";

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
    if (
      !hackathon.participatingTeams.find((team) => team.teamCode === teamCode)
    ) {
      res.status(404).json({ message: "Team not found" });
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
