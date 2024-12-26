import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { IsDebug } from '@awesome-cordova-plugins/is-debug/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetalhesCarroComponent } from './components/detalhes-carro/detalhes-carro.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureComponent } from './components/signature/signature.component';
import { Drivers } from '@ionic/storage';
import { GlobalService } from './api/service/global.service';
import { LoginPageModule } from './login/login.module';
import { ApiFreedom } from './service-freedom/api-freedom';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

// Import the library
registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent, DetalhesCarroComponent, SignatureComponent],
  entryComponents: [DetalhesCarroComponent, SignatureComponent],
  imports: [
    IonicModule.forRoot({ hardwareBackButton: false }),
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__kldb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    ReactiveFormsModule, // Para trabalhar com Reactive Forms Rapha 
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SignaturePadModule,
    LoginPageModule

  ],

  providers: [
    LaunchNavigator,
    IsDebug,
    AppVersion,
    GlobalService,
    ApiFreedom,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent],
  exports: []

})
export class AppModule { }
