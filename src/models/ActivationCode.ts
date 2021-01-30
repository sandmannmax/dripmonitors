import { Container } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { ActivationCode } from '../types/ActivationCode';

const dbProvider = Container.get(DatabaseProvider);

export namespace ActivationCodeModel {

  export async function FindActivationCode({ activationCode }: { activationCode: string }): Promise<Array<ActivationCode>> {
    return await dbProvider.Find<ActivationCode>('activation_codes', { code: activationCode });
  }

  export async function FindActivationCodeByMail({ mail }: { mail: string }): Promise<Array<ActivationCode>> {
    return await dbProvider.Find<ActivationCode>('activation_codes', { mail });
  }

  export async function CreateActivationCode({ activationCode, mail }: { activationCode: string, mail: string }): Promise<void> {
    await dbProvider.Insert('activation_codes', { code: activationCode, mail, used: false });
  }

  export async function CheckActivationCode({ activationCode }: { activationCode: string }): Promise<boolean> {
    return (await dbProvider.Find<ActivationCode>('activation_codes', { code: activationCode, used: false })).length != 0;
  }

  export async function UseActivationCode({ activationCode }: { activationCode: string }): Promise<void> {
    await dbProvider.Update('activation_codes', { code: activationCode }, { used: true });
  }

  export async function CheckIsDuplicate({ code }: { code: string }): Promise<boolean> {
    const result = await dbProvider.Find<ActivationCode>('activation_codes', { code });
    return result.length != 0;
  }
}