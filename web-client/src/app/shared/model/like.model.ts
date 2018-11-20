export class Like {
  constructor(
    public id?: string,
    public resourceType?: string,
    public resourceId?: number,
    public userId?: string,
    public createdDate?: Date
  ) {}
}
