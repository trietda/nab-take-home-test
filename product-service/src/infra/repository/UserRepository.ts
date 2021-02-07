import Repository from './Repository';
import { User } from '../../core';

export default class UserRepository extends Repository {
  async save(user: User) {
    await this.dispatchDomainEvents(user.domainEvents);
  }
}
