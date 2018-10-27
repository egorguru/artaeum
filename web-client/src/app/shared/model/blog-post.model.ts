export class BlogPost {
  constructor(
    public _id: number,
    public body: string,
    public userId: string,
    public createdDate: Date
  ) {
    this._id = _id ? _id : null
    this.userId = userId ? userId : null
    this.createdDate = createdDate ? createdDate : null
  }
}
