import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AlterarPage } from './alterar.page';
import { UsuarioService } from '../service/usuarios.service';
import { TextMaskModule } from 'angular2-text-mask';
import { StoreService2 } from '../shared/store.service';
import { AlterarPageRoutingModule } from './alterar-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarPageRoutingModule,
    TextMaskModule
  ],
  declarations: [AlterarPage],
  providers : [
    UsuarioService,
    StoreService2,
  ]
})
export class AlterarPageModule {}
