export default class Model {
  protected _id?: string;

  constructor(id?: string) {
    this._id = id;
  }

  get id(): string | undefined {
    return this._id;
  }

  setId(id?: string): void {
    if (id === undefined) {
      return;
    }

    this._id = id;
  }

  toJSON() {
    const json = {
      ...this,
      id: this.id,
    };
    delete json._id;
    return json;
  }
}
