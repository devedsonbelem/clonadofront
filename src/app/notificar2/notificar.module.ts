import { NotificarRoutingModule } from './notificar-routing.module';
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
import { NotificarComponent } from './notificar.component';


@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		NotificarRoutingModule,
		BottomMenuModule,
		TextMaskModule,
		FormsModule,

	],
	declarations: [NotificarComponent],
	providers: [
		NumerosClonadosService,
		StoreService2,
		LocalStorageService,
		Contacts,
		AndroidPermissions
	]
})
export class NotificarModule { }
