import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { JatenhocontaPage } from './jatenhoconta.page';
import { UsuarioService } from '../service/usuarios.service';
import { TextMaskModule } from 'angular2-text-mask';
import { StoreService2 } from '../shared/store.service';
import { JatenhocontaPageRoutingModule } from './jatenhoconta-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JatenhocontaPageRoutingModule,
    TextMaskModule
  ],
  declarations: [JatenhocontaPage],
  providers : [
    UsuarioService,
    StoreService2,
  ]
})
export class JatenhocontaPageModule {}
