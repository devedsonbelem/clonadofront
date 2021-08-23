import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { BottomMenuModule } from './bottom-menu/bottom-menu.component.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [BottomMenuComponent],
  imports: [BrowserModule,FormsModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,BottomMenuModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    SMS,
    AndroidPermissions,
    Contacts,
    SmsRetriever
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
