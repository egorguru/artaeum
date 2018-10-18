export class Comment {
  constructor(
    public _id: string,
    public text: string,
    public resourceType: string,
    public resourceId: number,
    public userId: string,
    public createdDate: Date
  ) {
    this._id = _id ? _id : null
    this.text = text ? text : null
    this.resourceType = resourceType ? resourceType : null
    this.resourceId = resourceId ? resourceId : null
    this.userId = userId ? userId : null
    this.createdDate = createdDate ? createdDate : null
  }
}
