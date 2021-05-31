import { ContatosNotificadosComponent } from './contatos-notificados.component';
import { ContatosNotificadosRoutingModule } from './contatos-notificados-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BottomMenuModule } from '../bottom-menu/bottom-menu.component.module';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { StoreService2 } from '../shared/store.service';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../shared/localstorage.service';
import { Contacts } from '@ionic-native/contacts/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';







@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		ContatosNotificadosRoutingModule,
		BottomMenuModule,
		TextMaskModule,
		FormsModule,

	],
	declarations: [ContatosNotificadosComponent],
	providers: [
		NumerosClonadosService,
		StoreService2,
		LocalStorageService,
		Contacts,
		AndroidPermissions
	]

	
})


export class ContatosNotificadosModule { }

