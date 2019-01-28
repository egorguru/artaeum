export class Article {
  constructor(
    public _id?: number,
    public title?: string,
    public body?: string,
    public userId?: string,
    public createdDate?: Date,
    public publishedDate?: Date,
    public image?: string,
    public category?: string,
    public isPublished?: boolean
  ) {}
}
