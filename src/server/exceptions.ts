export class Http400Error {
  constructor(private _responseBody: any) {

  }

  public get responseBody(): any {
    return this._responseBody;
  }
}
