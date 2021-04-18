import { UseCase } from '../../../../../core/base/UseCase';
import { ServerUuid } from '../../../domain/models/ServerUuid';
import { IUserRepo } from '../../../domain/repos/IUserRepo';

export interface CheckServerActiveUseCaseRequest {
  serverUuid: ServerUuid,
}

export class CheckServerActiveUseCase implements UseCase<CheckServerActiveUseCaseRequest, boolean> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(request: CheckServerActiveUseCaseRequest): Promise<boolean> {
    const user = await this.userRepo.getUserByServerUuid(request.serverUuid);
    return user.checkServerActive(request.serverUuid);
  }
}