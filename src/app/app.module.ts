import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
// import {DarusPage} from "../pages/darus/darus";
// import {QuranPage} from "../pages/quran/quran";
// import {FatwaPage} from "../pages/fatwa/fatwa";
// import {QuranAudioPage} from "../pages/quran-audio/quran-audio";
// import {PlaylistPage} from "../pages/playlist/playlist";
// import {TafsirPage} from "../pages/tafsir/tafsir";
// import {ContactPage} from "/pages/contact/contact";
import { IonicStorageModule } from '@ionic/storage';
import {PlayComponent} from "../components/play/play";
import { GlobalProvider } from '../providers/global/global';
@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // DarusPage,
    // FatwaPage,
    // QuranPage,
    // QuranAudioPage,
    // PlaylistPage,
    // TafsirPage,
    // ContactPage,
    PlayComponent
    // FileTransfer,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot({
          name: '__mydb',
          driverOrder: ['indexeddb', 'sqlite', 'websql']
      })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PlayComponent
    // HomePage,
    // DarusPage,
    // FatwaPage,
    // QuranPage,
    // QuranAudioPage,
    // PlaylistPage,
    // TafsirPage,
    // ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
      FileTransfer,
      FileTransferObject,
      File,
    GlobalProvider
  ]
})
export class AppModule {}
