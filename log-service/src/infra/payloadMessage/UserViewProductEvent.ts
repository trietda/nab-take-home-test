export default class UserViewProductEvent {
  constructor(
    public user: { name: string },
    public product: {
      id: string,
      name: string,
      price: number,
      brand?: string,
      color: string,
    },
  ) {
  }
}
