import {Injectable} from '@angular/core';

@Injectable()
export class MasterUrlService {
  private _url: string;

  constructor() {
    this._url = "https://examen-twj-molinaangel-fear161.c9users.io";

  }
  get url():string{
    return this._url;
  }

  set url(nuevoUrl:string){
    this._url = nuevoUrl;
  }
}
