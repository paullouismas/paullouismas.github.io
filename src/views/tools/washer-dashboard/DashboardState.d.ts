import { Iteam } from './Team'
import { Igame } from './Game'

export interface IdashboardState {
  public teams: Iteam[];
  public game: {
    started: boolean;
    startTime: Date | string | null;
  };
  public history: Igame[];
  public tabs: {
    activeTab: string;
  };
}
