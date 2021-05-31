import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarNumeroPageRoutingModule } from './recuperar-numero-routing.module';

import { RecuperarNumeroPage } from './recuperar-numero.page';
import { LocalStorageService } from '../shared/localstorage.service';
import { TextMaskModule } from 'angular2-text-mask';
import { StoreService2 } from '../shared/store.service';
import { NumerosClonadosService } from '../service/numeros-clonados.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarNumeroPageRoutingModule,
    TextMaskModule
  ],
  declarations: [RecuperarNumeroPage],
  providers: [LocalStorageService,StoreService2,NumerosClonadosService]
})
export class RecuperarNumeroPageModule {}
