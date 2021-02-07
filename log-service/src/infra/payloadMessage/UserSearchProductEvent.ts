export default class UserSearchProductEvent {
  constructor(
    public user: { name: string },
    public productSearchCriteria: {
      search: string
    }
  ) {
  }
}
