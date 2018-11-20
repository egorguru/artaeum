export class Post {
  constructor(
    public id?: number,
    public userId?: string,
    public text?: string,
    public createdDate?: Date
  ) {}
}
