import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificarComponent } from './notificar.component';

const routes: Routes = [
  {
    path: '',
    component: NotificarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificarRoutingModule {}
