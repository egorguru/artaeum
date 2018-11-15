export class Article {
  constructor(
    public _id?: number,
    public title?: string,
    public body?: string,
    public userId?: string,
    public createdDate?: Date,
    public image?: string
  ) {
    this._id = _id ? _id : null
    this.title = title ? title : null
    this.body = body ? body : null
    this.userId = userId ? userId : null
    this.createdDate = createdDate ? createdDate : null
    this.image = image ? image : null
  }
}
