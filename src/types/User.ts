export class User_O {
  public username: string;
}

export class User {
  public _id: string;
  public username: string;
  public password: string;
  public salt: string;
  public hasValidSession: boolean;
  public active: boolean;
  public confirmed: boolean;
}

export class UserJWT {
  public _id: string;
  public username: string;
}

export function GetUser_O(user: User): User_O {
  let userO: User_O = new User_O();
  userO.username = user.username;
  return userO;
}