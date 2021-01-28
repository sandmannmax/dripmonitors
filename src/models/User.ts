import { Container } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { User } from '../types/User';

const dbProvider = Container.get(DatabaseProvider);

export namespace UserModel {

  export async function SetValidSession({_id}: {_id: string}): Promise<void> {
    await dbProvider.Update('m_users', { _id, active: true, confirmed: true }, {hasValidSession: true});
  }
  export async function SetInvalidSession({_id}: {_id: string}): Promise<void> {
    await dbProvider.Update('m_users', {_id, active: true, confirmed: true }, {hasValidSession: false});
  }  

  export async function CreateUser({ username, password, salt, }: { username: string, password: string, salt: string }): Promise<Array<User>> {
    await dbProvider.Insert('m_users', { username, password, salt, hasValidSession: false, active: true, confirmed: false });
    let result = await dbProvider.Find<User>('m_users', { username, password, salt, active: true, confirmed: false });
    return result;
  }

  export async function UpdateUsername({_id, username}: {_id: string, username: string}): Promise<User> {
    await dbProvider.Update('m_users', {_id, active: true}, {username});
    let result = await dbProvider.Find<User>('m_users', {_id, active: true});
    if (result.length == 1)
      return result[0];
    else
      return undefined;
  }

  export async function UpdatePassword({_id, password}: {_id: string, password: string}): Promise<User> {
    await dbProvider.Update('m_users', {_id, active: true}, {password});
    let result = await dbProvider.Find<User>('m_users', {_id, active: true});
    if (result.length == 1)
      return result[0];
    else
      return undefined;
  }

  export async function FindUser({_id}: {_id: string}): Promise<User> {
    let result = await dbProvider.Find<User>('m_users', { _id, active: true });
    if (result.length == 1)
      return result[0];
    else
      return undefined;
  }

  export async function FindUserByUsername({username}: {username: string}): Promise<User> {
    let result = await dbProvider.Find<User>('m_users', { username, active: true });
    if (result.length == 1)
      return result[0];
    else
      return undefined;
  }

  export async function IsUsernameUnused({username}: {username: string}): Promise<boolean> {
    let result = await dbProvider.Find<User>('m_users', { username, active: true });
    return result.length == 0;
  }
}