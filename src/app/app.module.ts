import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { SharedModule } from './components/shared/shared.module';
import { LoginModule } from "./components/login/login.module";
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AdminModule } from './components/admin/admin.module';
import { GroupModule } from './components/group/group.module';

import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import localeMX from "@angular/common/locales/es-MX";
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeMX, 'es-MX');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'aula-social'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireFunctionsModule,
    SharedModule,
    LoginModule,
    DashboardModule,
    AdminModule,
    GroupModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-MX'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
