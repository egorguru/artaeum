export class Comment {
  constructor(
    public _id?: number,
    public text?: string,
    public resourceType?: string,
    public resourceId?: number,
    public userId?: string,
    public createdDate?: Date
  ) {}
}
