import mongoose from "mongoose";
import { HackathonStatus } from "../enums/HackathonStatus";
import { IHackathon } from "../models/hackathon";
import { participatingTeamSchema } from "./participatingTeam";

const hackathonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  organizerId: {
    type: String,
    required: true,
  },
  minParticipantCount: {
    type: Number,
    required: true,
  },
  maxParticipantCount: {
    type: Number,
    required: true,
  },
  participatingTeams: [participatingTeamSchema],
  registrationStartTime: {
    type: Number,
  },
  registrationEndTime: {
    type: Number,
  },
  status: {
    type: String,
    enum: HackathonStatus,
  },
  createdTime: {
    type: Number,
    required: true,
  },
  updatedTime: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IHackathon>("Hackathon", hackathonSchema);
