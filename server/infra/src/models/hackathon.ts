import { HackathonStatus } from "../enums/HackathonStatus";
import { IParticipatingTeam } from "./participating-team";

export interface CreateHackathonInput {
  name: string;
  description?: string;
  startTime: number;
  endTime: number;
  organizerId: string;
  minParticipantCount: number;
  maxParticipantCount: number;
  registrationStartTime?: number;
  registrationEndTime?: number;
}

export interface updateHackathonInput {
  name?: string;
  description?: string;
  startTime?: number;
  endTime?: number;
  minParticipantCount?: number;
  maxParticipantCount?: number;
  registrationStartTime?: number;
  registrationEndTime?: number;
}

export interface IHackathon extends CreateHackathonInput {
  id: string;
  participatingTeams: IParticipatingTeam[];
  moderators: string[];
  status: HackathonStatus;
  createdTime: number;
  updatedTime: number;
}

export interface AddModeratorInput {
  moderatorId: string;
}
