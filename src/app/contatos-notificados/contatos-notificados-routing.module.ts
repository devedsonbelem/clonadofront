import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosNotificadosComponent } from './contatos-notificados.component';

const routes: Routes = [
  {
    path: '',
    component: ContatosNotificadosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatosNotificadosRoutingModule {}


