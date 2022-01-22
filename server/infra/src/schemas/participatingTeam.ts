import mongoos from "mongoose";
import { ParticipatingTeamStatus } from "../enums/ParticipatingTeamStatus";

export const participatingTeamSchema = new mongoos.Schema({
  name: {
    type: String,
    requird: true,
  },
  teamCode: {
    type: String,
    required: true,
  },
  teamLeaderId: {
    type: String,
    required: true,
  },
  users: [String],
  status: {
    type: String,
    enum: ParticipatingTeamStatus,
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
