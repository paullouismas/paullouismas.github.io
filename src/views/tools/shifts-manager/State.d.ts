export type DateCompatible = Date
  | string // From Date.prototype.toString()
  | number; // From Date.now()

export type Tag = string;

export interface Ishift {
  public id: string;
  public startTime: DateCompatible;
  public endTime: DateCompatible;
  public tags: Tag[];
}

export interface IcurrentShift extends Ishift {
  public endTime?: DateCompatible;
}

export interface ISettings {
  public defaultTags: Tag[];
  public defaultLunchBreakDuration: number;
  public defaultMidshiftBreakDuration: number;
}

export interface Istate {
  public shiftsHistory: Ishift[];
  public currentShift?: IcurrentShift;
  public savedTags: Tag[];
  public settings: ISettings;
}
