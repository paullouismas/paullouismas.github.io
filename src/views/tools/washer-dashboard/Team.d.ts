import { Iplayer } from './Player'

export interface Iteam {
  public _id: number;
  public name: string;
  public mainMember: Iplayer;
  public additionalMembers: Iplayer[];
  public score: number;
}
