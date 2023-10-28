export interface createAndModifyType {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
export interface LogType {
  _id: string;
  createdAt: Date;
  createdBy: string;
  content?: string;
  type: string;
}
