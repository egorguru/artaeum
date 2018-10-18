export class Like {
  constructor(
    public id: string,
    public resourceType: string,
    public resourceId: number,
    public userId: string,
    public createdDate: Date
  ) {
    this.id = id ? id : null
    this.resourceType = resourceType ? resourceType : null
    this.resourceId = resourceId ? resourceId : null
    this.userId = userId ? userId : null
    this.createdDate = createdDate ? createdDate : null
  }
}
