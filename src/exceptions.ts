export class Http400Error {
  constructor(private _responseBody: any) {

  }

  get responseBody(): any {
    return this._responseBody;
  }
}
