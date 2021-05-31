import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoWppComponent } from './contatoWpp.component';

const routes: Routes = [
  {
    path: '',
    component: ContatoWppComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatoWppRoutingModule {}
