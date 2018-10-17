export class Subscription {
  constructor(
    public id: number,
    public profileId: string,
    public subscriberId: string,
    public createdDate: Date
  ) {
    this.id = id ? id : null
    this.profileId = profileId ? profileId : null
    this.subscriberId = subscriberId ? subscriberId : null
    this.createdDate = createdDate ? createdDate : null
  }
}
