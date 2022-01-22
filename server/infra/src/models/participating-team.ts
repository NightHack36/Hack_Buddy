import { ParticipatingTeamStatus } from "../enums/ParticipatingTeamStatus";

export interface CreateParticipatingTeamInput {
  name: string;
}

export interface JoinParticipatingTeamInput {
  teamCode: string;
}

export interface IParticipatingTeam {
  id: string;
  name: string;
  teamCode: string;
  teamLeaderId: string;
  status: ParticipatingTeamStatus;
  users: string[];
  createdTime: number;
  updatedTime: number;
}
