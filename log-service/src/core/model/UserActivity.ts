import User from './User';

export default class UserActivity {
  constructor(
    public user: User,
    public action: string,
    public objectType: string,
    public objectId?: string | null,
    public metadata?: object,
  ) {
  }
}
