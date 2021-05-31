import { UsuarioService } from './../service/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Telefone } from '../model/telefone';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { StoreService2 } from '../shared/store.service';

@Component({
	selector: 'app-recuperar-numero',
	templateUrl: './recuperar-numero.page.html',
	styleUrls: ['./recuperar-numero.page.scss'],
})
export class RecuperarNumeroPage implements OnInit {

	public telMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	usuNumero = "";
	telefone: Telefone;

	constructor(private alertController: AlertController,
		public myLocalStorage: LocalStorageService,
		public storeService: StoreService2,
		private service: UsuarioService) {
			this.telefone = new Telefone();
	}

	ngOnInit() {

	}

	tratarNumero(numero: string) {
		const result = numero.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
		return '+55' + result;
	}

	// numChecher() {
	// 	let newNum = this.usuNumero.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
	// 	while (newNum.includes('_')) {
	// 		newNum = newNum.replace('_', '');
	// 	}
	// 	return newNum;
	// }

	// recuperar() {
	// 	// console.log(this.numChecher());
	// 	if (this.telefone.numero != '' && this.telefone.numero.length > 9) {
	// 		const NUMERO = this.tratarNumero(this.telefone.numero);
	// 		this.numerosClonadosService.verificarUsuario(NUMERO, this.telefone.numero).subscribe(res => {
	// 		})
	// 	} else if (this.usuNumero == '') {
	// 		this.presentToast("Número inválido");
	// 	}
	// }

	recuperar() {
		try{
		this.service.recupereiNumero(this.telefone).subscribe(res => {
			this.modalNaoClonado();
	})
     

      }catch {
			this.modalNaoExiste();
	 }
	}

	
	async modalNaoClonado() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			message: 'O número foi retirado de nossa base de telefones clonados.',
			buttons: ['OK']
		});
		await alert.present();
		// const { role } = await alert.onDidDismiss();
		// console.log('onDidDismiss resolved with role', role);
	}

	async modalNaoExiste() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			message: 'O número não existe em nossa base de telefones clonados.',
			buttons: ['OK']
		});
		await alert.present();
		// const { role } = await alert.onDidDismiss();
		// console.log('onDidDismiss resolved with role', role);
	}


}
