import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'app-politica-privacidade',
	templateUrl: './politica-privacidade.page.html',
	styleUrls: ['./politica-privacidade.page.scss'],
})
export class PoliticaPrivacidadePage implements OnInit {

	termo = false;

	constructor(private router: Router,
		public toastCtrl: ToastController) { 
			
		}

	ngOnInit() {
		const tabs = document.querySelectorAll('ion-tab-bar');
			Object.keys(tabs).map((key) => {
			  tabs[key].style.display = 'none';
			});
		
	}

	continuar() {
		if (this.termo) {
			this.router.navigate(["home"]);
		} else {
			this.presentToast("Aceite os termos de uso para continuar");
		}
	}

	async presentToast(message: string) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});
		(await toast).present();
	}


}
