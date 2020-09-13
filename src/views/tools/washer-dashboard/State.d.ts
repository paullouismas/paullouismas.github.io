import { Iteam } from './Team'
import { Igame } from './Game'

export interface Istate {
  public teams: Iteam[];
  public game: {
    public started: boolean;
    public startTime: Date | string | null;
  };
  public history: Igame[];
}
