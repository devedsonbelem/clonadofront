import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletimPage } from './boletim.page';

const routes: Routes = [
  {
    path: '',
    component: BoletimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletimPageRoutingModule {}
