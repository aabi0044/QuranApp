import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import {isArray} from "rxjs/util/isArray";
import {GlobalProvider} from "../../providers/global/global";
import {global} from "@angular/core/src/util";

/**
 * Generated class for the PlayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'play',
  templateUrl: 'play.html'
})
export class PlayComponent {
  loading_status:any;
  audio_status:any;
  audio: any;
  data: Observable<any>;
  result = [];
  timer:any;
  saturation:any;
  selectedId:any;
  audio_current:any;
  audio_repeat:any;
  get_time(value){
    // console.log('hhhh'+value.toFixed(0));
    const hours: number = Math.floor(value.toFixed(0) / 60);
    const minutes: number = (value.toFixed(0) - hours * 60);

    if (hours < 10 && minutes < 10) {
      return '' + hours + ':0' + (value.toFixed(0) - hours * 60);
    }
    if (hours > 10 && minutes > 10) {
      return '' + hours + ':' + (value.toFixed(0) - hours * 60);
    }
    if (hours > 10 && minutes < 10) {
      return hours + ':0' + (value.toFixed(0) - hours * 60);
    }
    if (minutes > 10) {
      return '' + hours + ':' + (value.toFixed(0) - hours * 60);
    }
  }
  audio_action(action){
    if(this.audio_status == 1 || this.audio_status == 2) {
      // console.log('audio_pause1');
      if(action == 1) {
        this.audio.play();
        this.audio_status = 1;
      }
      else if(action == 2){
        this.audio.pause();
        this.audio_status = 2;
      }
    }
  }
  play_audio(id){
    this.selectedId = id;
    // console.log(this.audio_status);
    if(this.audio_status == 1) {
      this.audio.pause();
      console.log('Other audio pause');
    }
    this.audio = new Audio();
    this.audio.src = this.result[id]['audio_url'];
    this.audio.load();
    this.playAudio();
  }
  playAudio() {
    this.audio_status = 1;
    console.log('audio_play');
    this.audio.play();
    // this.audio.pause();
    if(this.audio_repeat == true){
      this.audio.loop = true;
    }else {
      this.audio.loop = false;
    }
    // this.audio_max = this.audio.duration;
  }
  checkfun(){
  }
  changeFunc(){
    console.log(this.saturation);
  }
  onChangeTime() : void {
    let value = this.saturation;
    if(this.audio_status == 1 || this.audio_status == 2) {
      let update = 100 - value;
      console.log(update);
      let update1 = update / 100;
      console.log(update1);
      let update2 = 1 - update1;
      console.log(update2);
      let data1 = value;
      console.log(data1);
      let update3 = this.audio.duration * update2;
      console.log(update3);
      this.audio.currentTime = update3;
      // console.log(this.audio.current);
      console.log(this.audio.duration);

      console.log(this.audio.currentTime);
    }
  }
  rangeUpdate(){
    if(this.audio_status == 1 || this.audio_status == 2) {
      this.saturation = (this.audio.currentTime*100)/this.audio.duration;
    }
  }
  next(){
    this.play_audio(this.selectedId+1);
    console.log(this.selectedId);
  }
  newfun(value){
    console.log(this.result[value-1]);
  }
  pre(){
    if (this.selectedId != 1) {
      this.play_audio(this.selectedId - 1);
    }
  }
  audio_repeatFun(value){
    console.log(this.global.audio_repeat+' check audio repeat');
    if(value == 1) {
      this.global.audio_repeat = 1;
    }
    if(value == 0){
      this.global.audio_repeat = 0;
    }
    // this.global.audio_repeat = 1+this.global.audio_repeat;
    console.log(this.global.audio_repeat);
    this.audio_repeat = false;
    this.global.url = "true";
    if(this.audio_status == 1) {
      if(value == 1) {
        this.audio.loop = true;
        this.audio_repeat = true;
      }
      if(value == 0){
        this.global.url = "False";
        this.audio.loop = false;
        this.audio_repeat = false;
      }
    }
    else {
      if(value == 1) {
        this.audio_repeat = true;
      }
      if(value == 0){
        this.audio_repeat = false;
      }
    }
  }
  alert: any;
  fileTransfer: FileTransferObject = this.transfer.create();
  progress1:any;
  text: string;
  presentAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Downloading',
      message: 'Downloading start',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.fileTransfer.abort();
            console.log('Cancel clicked');
          }
        },
      ]
    });
    this.alert.present();
  }
  startData:any;
  downloadFun(){
    // {id: "537", title: "Gabar An Maxram lasocon Salada Magabin karta?", author: "Shiikh Abdiqadir Xashi Baajuuri", audio_url: "http://nuuruliimaan.net/uploads/audio/clip/537.mp3"}

    if(this.audio_status == 1 || this.audio_status == 2){
      let url = this.result[this.selectedId]['audio_url'];
      let name = this.result[this.selectedId]['id'] +'.mp3';
      // 'http://nuuruliimaan.net/uploads/audio/clip/AUDIO_46801B-E677A0-AF6474-7445D3-EE3FAB-2F2FEA.mp3';
      this.fileTransfer.onProgress((progressEvent) => {
        console.log(progressEvent);
        var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
        this.progress1 = perc;
        this.alert.setMessage(perc + '% Downloading Complete');
      });
      this.fileTransfer.download(url, this.file.externalRootDirectory +
          '/Download/' + name).then((entry) => {
        alert('download complete: ' + entry.toURL());
        this.alert.dismiss();
        alert(url);
      }, (error) => {
        alert(error);
        this.alert.dismiss();
        // handle error
      });
      this.presentAlert();
    }
  }
  loading:any;
  checkfun1(){
    // console.log('hello');
  }
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,
              public navParams: NavParams, public httpClient: HttpClient,
              private alertCtrl: AlertController,private transfer: FileTransfer,
              private file: File,private storage: Storage,
              public global: GlobalProvider
  ) {
    // this.global.audio_repeat = 1;
    console.log(global.audio_repeat);
    this.audio_repeat = global.audio_repeat;
    this.audio_status = 0;
    setInterval(this.checkfun1, 1500);
  console.log(this.audio_status);
    // this.clickMe1();
    console.log('Hello PlayComponent Component');
    this.text = 'Hello Testing';
  }

}
