import { UsuarioService } from './../service/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { StoreService2 } from '../shared/store.service';
import { Telefone } from '../model/telefone';

@Component({
	selector: 'app-verificar-numero',
	templateUrl: './verificar-numero.page.html',
	styleUrls: ['./verificar-numero.page.scss'],
})
export class VerificarNumeroPage implements OnInit {

	numero = "";
	telefone: Telefone;

	public telMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

	constructor(private numerosClonadosService: NumerosClonadosService,
		private alertController: AlertController,
		private service: UsuarioService,
		public toastCtrl: ToastController,
		private router: Router) {
		this.telefone = new Telefone();
	}

	ngOnInit() {
	}

	// async showAlert(message: string) {
	// 	const alert = await this.alertController.create({
	// 		message: message,
	// 		buttons: [
	// 			{
	// 				text: "OK"
	// 			}
	// 		]
	// 	});

	// 	await alert.present();
	// }

	tratarNumero(numero: string) {
		const result = numero.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
		return '+55' + result;
	}

	// verificar() {
	// 	if (this.numero != "") {
	// 		this.numerosClonadosService.buscarNumero(this.numero, window.location.href).subscribe(res => {
	// 			if (res && res.status === 200) {
	// 				this.showAlert("Este número: " + this.numero + " foi clonado é está cadastrado em nosso banco de dados!");
	// 				// this.storeService.modalBuscarNumeroValue = this.numero;
	// 				//this.storeService.modalBuscarNumeroError = false;
	// 			} else {
	// 				this.showAlert("Não foi possível encontrar o número: " + this.numero + " em nosso banco de dados!");
	// 			}
	// 		});
	// 	}
	// }


	verificar() {

		this.service.verificarNumero(this.telefone).subscribe(res => {
		if(res.status == "clonado"){
			this.modalMensagem(res.status);
		}else{
			this.modalMensagem(res.status);
		}
			// this.modalMensagem(res.status);
		},error=>{
			this.modalNaoClonado();
		}
		);
	}

	navigate(route: string) {
		this.router.navigate([route]);
	}

	// async presentToast(message: string) {
	// 	let toast = this.toastCtrl.create({
	// 		message: message,
	// 		duration: 3000,
	// 		position: 'bottom'
	// 	});
	// 	(await toast).present();
	// }

	async modalMensagem(message: string) {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			message: message,
			buttons: ['OK']
		});
		await alert.present();
		//const { role } = await alert.onDidDismiss();
		//console.log('onDidDismiss resolved with role', role);
	}

	async modalNaoClonado() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			message: 'Número não se encontra em nossa base de telefones clonados',
			buttons: ['OK']
		});
		await alert.present();
		//const { role } = await alert.onDidDismiss();
		//console.log('onDidDismiss resolved with role', role);
	}
}
