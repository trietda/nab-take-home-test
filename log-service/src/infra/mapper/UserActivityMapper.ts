import { UserActivity } from '../../core';
import UserActivityEntity from '../entity/UserActivityEntity';

export default class UserActivityMapper {
  static toEntity(model: UserActivity): UserActivityEntity {
    const entity = new UserActivityEntity();
    entity.userName = model.user.name;
    entity.action = model.action;
    entity.objectType = model.objectType;
    entity.objectId = model.objectId;

    if (model.metadata) {
      entity.metadata = JSON.parse(JSON.stringify(model.metadata));
    }

    return entity;
  }
}
