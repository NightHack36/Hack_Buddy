import { Request, Response } from "express";
import { HackathonStatus } from "../enums/HackathonStatus";
import {
  CreateHackathonInput,
  IHackathon,
  updateHackathonInput,
} from "../models/hackathon";
import { UserTokenDetails } from "../models/user";
import { mapObject } from "../utilities/RemoveUnderscoreId";
import Hackathon from "./../schemas/hackathon";

export const createHackathon = async (req: Request, res: Response) => {
  try {
    const body: CreateHackathonInput = req.body;
    const userDetails: UserTokenDetails = JSON.parse(
      req.headers["user"] as string
    );
    if (userDetails.id !== body.organizerId) {
      res.status(401).json();
      return;
    }
    const timeMilli = new Date().getTime();
    const hackathon = new Hackathon({
      name: body.name,
      startTime: body.startTime,
      endTime: body.endTime,
      organizerId: body.organizerId,
      minParticipantCount: body.minParticipantCount,
      maxParticipantCount: body.maxParticipantCount,
      participatingTeams: [],
      moderators: [],
      status: HackathonStatus.HACKATHON_CREATED,
      createdTime: timeMilli,
      updatedTime: timeMilli,
    });
    if (body.description) hackathon.description = body.description;
    if (body.registrationStartTime)
      hackathon.registrationStartTime = body.registrationStartTime;
    if (body.registrationEndTime)
      hackathon.registrationEndTime = body.registrationEndTime;
    const newHackathon = await hackathon.save();
    res.status(201).json(mapObject(newHackathon));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const updateHackathon = async (req: Request, res: Response) => {
  try {
    const body: updateHackathonInput = req.body;
    const hackathonId: string = req.params.hackathonId;
    const userDetails: UserTokenDetails = JSON.parse(
      req.headers["user"] as string
    );
    const hackathon: IHackathon | null = await Hackathon.findOne({
      _id: hackathonId,
    });
    if (!hackathon) {
      res.status(404).json({ message: "hackathon not found" });
      return;
    }
    if (hackathon.organizerId !== userDetails.id) {
      res.status(401).json();
      return;
    }
    const updatedHackathon = await Hackathon.findOneAndUpdate(
      { _id: hackathonId },
      {
        $set: {
          ...body,
          updatedTime: new Date().getTime(),
        },
      },
      { new: true }
    );
    res.status(200).json(mapObject(updatedHackathon));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getHackathons = async (req: Request, res: Response) => {
  try {
    const hackathons = await Hackathon.aggregate([
      {
        $match: {},
      },
      {
        $project: {
          participatingTeams: 0,
        },
      },
    ]);
    if (hackathons.length === 0) {
      res.status(204).json();
      return;
    }
    res
      .status(200)
      .json(hackathons.map((hackathon) => mapObject(hackathon, true)));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getHackathon = async (req: Request, res: Response) => {
  try {
    const hackathonId = req.params.hackathonId;
    const hackathon = await Hackathon.findOne({ _id: hackathonId });
    if (!hackathon) {
      res.status(404).json({ message: "Hackathon not found" });
      return;
    }
    res.status(200).json(mapObject(hackathon));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
