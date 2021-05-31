import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BottomMenuModule } from '../bottom-menu/bottom-menu.component.module';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { StoreService2 } from '../shared/store.service';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule } from '@angular/forms';
import { NotificarContatosComponent } from './notificar-contatos.component';
import { NotificarContatosRoutingModule } from './notificar-contatos-routing.module';
import { LocalStorageService } from '../shared/localstorage.service';
import { Contacts } from '@ionic-native/contacts/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		NotificarContatosRoutingModule,
		BottomMenuModule,
		TextMaskModule,
		FormsModule,

	],
	declarations: [NotificarContatosComponent],
	providers: [
		NumerosClonadosService,
		StoreService2,
		LocalStorageService,
		Contacts,
		AndroidPermissions
	]
})
export class NotificarContatosModule { }
