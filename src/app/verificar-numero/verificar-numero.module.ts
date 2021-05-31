import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarNumeroPageRoutingModule } from './verificar-numero-routing.module';

import { VerificarNumeroPage } from './verificar-numero.page';
import { BottomMenuModule } from '../bottom-menu/bottom-menu.component.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { StoreService2 } from '../shared/store.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarNumeroPageRoutingModule,
    BottomMenuModule,    
    TextMaskModule,
  ],
  declarations: [VerificarNumeroPage],
  providers : [NumerosClonadosService,StoreService2,LocalStorageService]
})
export class VerificarNumeroPageModule {}
