import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificarContatosComponent } from './notificar-contatos.component';

const routes: Routes = [
  {
    path: '',
    component: NotificarContatosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificarContatosRoutingModule {}
