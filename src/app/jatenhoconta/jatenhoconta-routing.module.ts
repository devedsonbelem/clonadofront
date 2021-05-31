import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JatenhocontaPage } from './jatenhoconta.page';


const routes: Routes = [
  {
    path: '',
    component: JatenhocontaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JatenhocontaPageRoutingModule {}
