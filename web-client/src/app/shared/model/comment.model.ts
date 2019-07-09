export class Comment {
  constructor(
    public _id?: string,
    public text?: string,
    public resourceType?: string,
    public resourceId?: string,
    public userId?: string,
    public createdDate?: Date
  ) {}
}
