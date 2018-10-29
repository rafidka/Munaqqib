export class Http400BadRequest {
  constructor(private _responseBody: any) {

  }

  get responseBody(): any {
    return this._responseBody;
  }
}

export class Http404NotFound {
  constructor(private _responseBody: any) {

  }

  get responseBody(): any {
    return this._responseBody;
  }
}
