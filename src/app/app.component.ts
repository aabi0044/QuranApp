import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
// import {FatwaPage} from "../pages/fatwa/fatwa";
// import {QuranPage} from "../pages/quran/quran";
// import {ContactPage} from "../pages/contact/contact";
import {HttpClient} from "@angular/common/http";
import {GlobalProvider} from "../providers/global/global";
import { Events } from 'ionic-angular';
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";
import {Storage} from "@ionic/storage";
import { PlayComponent } from '../components/play/play';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = PlayComponent;
  text1:any;
  audio_level:any;
  audio_status:any;
  audio_repeat:any;
  audio:any;
  customList = [];
  offset:any;
  audioChange(action){
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

  rangeUpdate(){
    if(this.audio_status == 1 || this.audio_status == 2) {
      this.audio_level = (this.audio.currentTime*100)/this.audio.duration;
    }
  }
  onAudioChange(){
    let value = this.audio_level;
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
  get_time(value){
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
  alert:any;
  downloadProgress:any;
  fileTransfer: FileTransferObject = this.transfer.create();
  audioRepeatChange(value){
    this.audio_repeat = false;
    if(this.audio_status == 1) {
      if(value == 1) {
        this.audio.loop = true;
        this.audio_repeat = true;
      }
      if(value == 0){
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
    downloadPopUp() {
      console.log('in alert');
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
  download(){
      // this.downloadPopUp();
      // this.alert.setMessage('10' + '% Downloading Complete');
      if(this.audio_status == 1 || this.audio_status == 2){
          let index = this.customList.findIndex(e => e.id === this.selectedId);
          let url = this.customList[index]['audio_url'];
          let name = this.customList[index]['id'] +'.mp3';
          // 'http://nuuruliimaan.net/uploads/audio/clip/AUDIO_46801B-E677A0-AF6474-7445D3-EE3FAB-2F2FEA.mp3';
          this.fileTransfer.onProgress((progressEvent) => {
              console.log(progressEvent);
              var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
              this.downloadProgress = perc;
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
          this.downloadPopUp();
      }
    console.log('coming soon')
  }
  pre(){
      let index = this.customList.findIndex(e => e.id === this.selectedId);
      index = index-1;
      this.play_audio(this.customList[index]['id']);
  }
  next(){
      console.log('next');
      let index = this.customList.findIndex(e => e.id === this.selectedId);
      index = index+1;
      this.play_audio(this.customList[index]['id']);
    console.log('coming soon')
  }
  play_audio(id){
      let index = this.customList.findIndex(e => e.id === id);
      console.log(id);
      this.selectedId = id;
      this.events.publish('play:audioId', this.customList[index]['id']);
      console.log(this.customList[index]);
      let url = this.customList[index]['audio_url'];
    // this.selectedId = id;
    // console.log(this.audio_status);
    if(this.audio_status == 1) {
      this.audio.pause();
      console.log('Other audio pause');
    }
    this.audio = new Audio();
    this.audio.src = url;
    this.audio.load();
    // simple play enable function to start playing audio
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
    selectedId:any;
  loading:any;
  che1:any;
  checkfun(){
      if(this.audio_status == 1 || this.audio_status == 2) {
          this.che1 = this.audio.currentTime;
      }
  }
  clickfun(event){
      console.log(event);
      console.log(this.audio_level);
  }
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public global: GlobalProvider,
              public events: Events,
              private transfer: FileTransfer,
              private file: File,private storage: Storage,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController
  ) {

      file.createDir(this.file.externalRootDirectory,'mirza339',true);
      setInterval(this.checkfun, 1500);
    this.offset = 0 ;
    this.audio_repeat = false;
    this.audio_status = 0 ;
    this.audio_level = 0;
    events.subscribe('play:audio', (id) => {
      this.play_audio(id);
    });
    events.subscribe('data:fetch', (data) => {
      console.log('data from playlist');
      console.log(data);
        this.customList.push(data);
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

