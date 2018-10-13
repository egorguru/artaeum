export class User {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: any[],
    public createdDate?: Date,
    public password?: string
  ) {
    this.id = id ? id : null
    this.login = login ? login : null
    this.firstName = firstName ? firstName : null
    this.lastName = lastName ? lastName : null
    this.email = email ? email : null
    this.activated = activated ? activated : false
    this.langKey = langKey ? langKey : null
    this.authorities = authorities ? authorities : null
    this.createdDate = createdDate ? createdDate : null
    this.password = password ? password : null
  }
}
