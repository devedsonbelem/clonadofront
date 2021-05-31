import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { NovotelPage } from './novotel.page';
import { UsuarioService } from '../service/usuarios.service';
import { TextMaskModule } from 'angular2-text-mask';
import { StoreService2 } from '../shared/store.service';
import { NovotelPageRoutingModule } from './novotel-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovotelPageRoutingModule,
    TextMaskModule
  ],
  declarations: [NovotelPage],
  providers : [
    UsuarioService,
    StoreService2,
  ]
})
export class NovotelPageModule {}
