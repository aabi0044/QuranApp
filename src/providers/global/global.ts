import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {global} from "@angular/core/src/util";

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  public url = "http://172.16.137.17/";
  public audio_repeat = 0;
  public selectedId:any;
  constructor(public http: HttpClient) {
    console.log('Hello in global providers');
  }

}
