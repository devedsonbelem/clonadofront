import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { UsuarioService } from '../service/usuarios.service';
import { TextMaskModule } from 'angular2-text-mask';
import { StoreService2 } from '../shared/store.service';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TextMaskModule
  ],
  declarations: [LoginPage],
  providers : [
    UsuarioService,
    StoreService2,
  ]
})
export class LoginPageModule {}



