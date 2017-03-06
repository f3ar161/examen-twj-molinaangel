import {Injectable} from '@angular/core';

@Injectable()
export class MasterUrlService {
  private _url: string;

  constructor() {
    this._url = "https://ide.c9.io/f3ar161/examen-twj-molinaangel";

  }
  get url():string{
    return this._url;
  }

  set url(nuevoUrl:string){
    this._url = nuevoUrl;
  }
}
