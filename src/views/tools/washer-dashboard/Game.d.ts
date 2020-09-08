import { Iteam } from './Team'

export interface Igame {
  public _id: number;
  public startTime: Date | string;
  public winningTeam: Iteam;
  public teams: Iteam[];
}
