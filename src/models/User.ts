import { Container } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { User } from '../types/User';

const dbProvider = Container.get(DatabaseProvider);

export namespace UserModel {
  export async function SetValidSession({_id}: {_id: string}): Promise<void> {
    await dbProvider.Update('users', {_id, active: true}, {hasValidSession: true});
  }
  export async function SetInvalidSession({_id}: {_id: string}): Promise<void> {
    await dbProvider.Update('users', {_id, active: true}, {hasValidSession: false});
  }

  export async function CreateUser({ username, mail, password, salt, activationCodeId }: { username: string, mail: string, password: string, salt: string, activationCodeId: string }): Promise<Array<User>> {
    await dbProvider.Insert('users', { username, mail, password, salt, activationCodeId, hasValidSession: false, active: true });
    let result = await dbProvider.Find<User>('users', { username, mail, password, salt, activationCodeId });
    return result;
  }

  export async function UpdateUsername({_id, username}: {_id: string, username: string}): Promise<User> {
    await dbProvider.Update('users', {_id, active: true}, {username});
    let result = await dbProvider.Find<User>('users', {_id, active: true});
    if (result.length == 1)
      return result[0];
    else
      return undefined;
  }

  export async function UpdateMail({_id, mail}: {_id: string, mail: string}): Promise<User> {
    await dbProvider.Update('users', {_id, active: true}, {mail});
    let result = await dbProvider.Find<User>('users', {_id, active: true});
    if (result.length == 1)
      return result[0];
    else
      return undefined;
  }

  export async function UpdatePassword({_id, password}: {_id: string, password: string}): Promise<User> {
    await dbProvider.Update('users', {_id, active: true}, {password});
    let result = await dbProvider.Find<User>('users', {_id, active: true});
    if (result.length == 1)
      return result[0];
    else
      return undefined;
  }

  export async function FindUser({_id}: {_id: string}): Promise<User> {
    let result = await dbProvider.Find<User>('users', {_id, active: true});
    if (result.length == 1)
      return result[0];
    else
      return undefined;
  }

  export async function FindUserByUsername({username}: {username: string}): Promise<User> {
    let result = await dbProvider.Find<User>('users', {username, active: true});
    if (result.length == 1)
      return result[0];
    else
      return undefined;
  }

  export async function DeleteUser({_id}: {_id: string}): Promise<void> {
    await dbProvider.Update('users', {_id, active: true}, {active: false});
  }

  export async function IsUsernameUnused({username}: {username: string}): Promise<boolean> {
    let result = await dbProvider.Find<User>('users', {username});
    return result.length == 0;
  }

  export async function IsMailUnused({mail}: {mail: string}): Promise<boolean> {
    let result = await dbProvider.Find<User>('users', {mail});
    return result.length == 0;
  }
}