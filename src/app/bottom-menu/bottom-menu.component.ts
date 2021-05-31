import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertController, IonTabBar, Platform } from '@ionic/angular';
import { LocalStorageService } from '../shared/localstorage.service';

@Component({
	selector: 'app-bottom-menu',
	templateUrl: './bottom-menu.component.html',
	styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent implements OnInit {

	@ViewChild('tabs', { read: IonTabBar }) private tabBar: IonTabBar;
	selected = "";
	

	constructor(private myLocalStorage: LocalStorageService,
		private alertCtrl: AlertController,
		private platform: Platform,
		private router: Router) {
		// this.selected = "login";
	}


	

	ngOnInit() {
		// this.myLocalStorage.delete("verificacao");
		// this.myLocalStorage.delete("notificarContatos");
	}

	onChange(ev: any) {
		this.selected = this.tabBar.selectedTab;
		// if (ev) {
		// 	this.myLocalStorage.delete("verificacao");
		// 	this.myLocalStorage.delete("notificarContatos");
		// }
	}

	async sair() {
		let selectedBefore = this.selected;
		this.selected = "sair";
		let alert = await this.alertCtrl.create({
			header: 'Tem certeza que deseja sair?',
			cssClass: 'rejectButton',
			buttons: [
				{
					text: 'SIM',
					cssClass: 'alertButton',
					handler: () => {
						navigator['app'].exitApp();
					},
				},
				{
					text: 'NÃO',
					handler: () => {
						alert.dismiss({ "navigate": true });

					}
				}
			]
		});
		alert.present();
		alert.onDidDismiss().then(() => {
			this.selected = selectedBefore;

		});
	}


}
