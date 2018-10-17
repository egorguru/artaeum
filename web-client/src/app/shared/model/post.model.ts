export class Post {
  constructor(
    public id?: number,
    public userId?: string,
    public text?: string,
    public createdDate?: Date
  ) {
    this.id = id ? id : null
    this.userId = userId ? userId : null
    this.text = text ? text : null
    this.createdDate = createdDate ? createdDate : null
  }
}
