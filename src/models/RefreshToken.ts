import { Container } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { RefreshToken } from '../types/RefreshToken';

const dbProvider = Container.get(DatabaseProvider);

export namespace RefreshTokenModel {

  export async function Insert({_id, userId}: {_id: string, userId: string}): Promise<RefreshToken> {
    const now = Number((Date.now()/1000).toString().split('.')[0]);
    await dbProvider.Insert('refresh_tokens', {_id, userId, timestamp: now});
    const result = await dbProvider.Find<RefreshToken>('refresh_tokens', {_id, userId, timestamp: now});
    if (result.length == 1)
      return result[0]
    else
      return undefined;
  }

  export async function Find({_id}: {_id: string}): Promise<RefreshToken> {
    const result = await dbProvider.Find<RefreshToken>('refresh_tokens', {_id});
    if (result.length == 1)
      return result[0]
    else
      return undefined;
  }

  export async function CheckIsDuplicate({_id}: {_id: string }): Promise<boolean> {
    const result = await dbProvider.Find<RefreshToken>('refresh_tokens', {_id});
    return result.length != 0;
  }
}