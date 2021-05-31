import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticaPrivacidadePage } from './politica-privacidade.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticaPrivacidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticaPrivacidadePageRoutingModule {}
