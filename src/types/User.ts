export class User_O {
  public username: string;
  public mail: string;
}

export class User {
  public _id: string;
  public username: string;
  public mail: string;
  public password: string;
  public salt: string;
  public activationCodeId: string;
  public hasValidSession: boolean;
}

export class UserJWT {
  public _id: string;
  public username: string;
}

export function GetUser_O(user: User): User_O {
  let userO: User_O = new User_O();
    userO.username = user.username;
    userO.mail = user.mail;
    return userO;
}