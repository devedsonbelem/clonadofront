import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BottomMenuModule } from '../bottom-menu/bottom-menu.component.module';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { StoreService2 } from '../shared/store.service';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule } from '@angular/forms';
import { HomePage } from '../home/home.page';
import { LocalStorageService } from '../shared/localstorage.service';
import { Contacts, ContactFieldType, ContactFindOptions, Contact } from '@ionic-native/contacts/ngx';
import { ContatoWppComponent } from './contatoWpp.component';
import { ContatoWppRoutingModule } from './contatoWpp-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ContatoWppRoutingModule,
    BottomMenuModule,    
    TextMaskModule,
    FormsModule,
    
  ],
  declarations: [ContatoWppComponent],
  providers: [NumerosClonadosService,StoreService2,LocalStorageService,Contacts]
})
export class ContatoWppModule {} 
