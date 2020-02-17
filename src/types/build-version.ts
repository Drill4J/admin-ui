export interface BuildVersion {
  buildVersion: string;
  addedDate: number;
  totalMethods: number;
  newMethods: number;
  modifiedMethods: number;
  unaffectedMethods: number;
  deletedMethods: number;
  [key: string]: string | number;
}
