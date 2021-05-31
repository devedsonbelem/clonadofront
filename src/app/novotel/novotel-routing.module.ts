import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovotelPage } from './novotel.page';


const routes: Routes = [
  {
    path: '',
    component: NovotelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovotelPageRoutingModule {}
