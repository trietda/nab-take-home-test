import Repository from './Repository';
import { UserActivity } from '../../core';
import { UserActivityMapper } from '../mapper';
import { UserActivityEntity } from '../entity';

export default class UserActivityRepository extends Repository {
  async save(activity: UserActivity): Promise<void> {
    const activityRepo = this.entityManager.getRepository(UserActivityEntity);
    const entity = UserActivityMapper.toEntity(activity);
    await activityRepo.save(entity);
  }
}
