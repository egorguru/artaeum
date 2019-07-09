export class Article {
  constructor(
    public _id?: string,
    public title?: string,
    public body?: string,
    public userId?: string,
    public createdDate?: Date,
    public image?: string,
    public category?: string
  ) {}
}
