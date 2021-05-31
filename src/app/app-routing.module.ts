import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'novotel',
    loadChildren: () => import('./novotel/novotel.module').then(m => m.NovotelPageModule)
  },

  {
    path: 'jatenhoconta',
    loadChildren: () => import('./jatenhoconta/jatenhoconta.module').then(m => m.JatenhocontaPageModule)
  },
  {
    path: 'boletim',
    loadChildren: () => import('./boletim/boletim.module').then(m => m.BoletimPageModule)
  },


  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then(m => m.FaqPageModule)
  },
  {
    path: 'verificar-numero',
    loadChildren: () => import('./verificar-numero/verificar-numero.module').then(m => m.VerificarNumeroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'alterar',
    loadChildren: () => import('./alterar/alterar.module').then(m => m.AlterarPageModule)
  },
  {
    path: 'notificarContatos',
    loadChildren: () => import('./notificar-contatos/notificar-contatos.module').then(m => m.NotificarContatosModule)
  },
  {
    path: 'contatosNotificados',
    loadChildren: () => import('./contatos-notificados/contatos-notificados.module').then(m => m.ContatosNotificadosModule)
  },
  {
    path: 'notificar2',
    loadChildren: () => import('./notificar2/notificar.module').then(m => m.NotificarModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'contatoApi',
    loadChildren: () => import('./contatoWpp/contatoWpp.module').then(m => m.ContatoWppModule)
  },
  {
    path: 'politica-privacidade',
    loadChildren: () => import('./politica-privacidade/politica-privacidade.module').then(m => m.PoliticaPrivacidadePageModule)
  },
  {
    path: 'recuperar-numero',
    loadChildren: () => import('./recuperar-numero/recuperar-numero.module').then(m => m.RecuperarNumeroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
