import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarNumeroPage } from './recuperar-numero.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarNumeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarNumeroPageRoutingModule {}
