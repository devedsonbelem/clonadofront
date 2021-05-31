import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BottomMenuModule } from '../bottom-menu/bottom-menu.component.module';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { StoreService2 } from '../shared/store.service';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule } from '@angular/forms';

import { LocalStorageService } from '../shared/localstorage.service';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    BottomMenuModule,
    TextMaskModule,
    FormsModule
  ],
  declarations: [HomePage],
  providers: [
    NumerosClonadosService,
    StoreService2,
    LocalStorageService
  ]
})
export class HomePageModule { }
