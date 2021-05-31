import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticaPrivacidadePageRoutingModule } from './politica-privacidade-routing.module';

import { PoliticaPrivacidadePage } from './politica-privacidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticaPrivacidadePageRoutingModule
  ],
  declarations: [PoliticaPrivacidadePage]
})
export class PoliticaPrivacidadePageModule {}
