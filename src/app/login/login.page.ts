import { Telefone } from './../model/telefone';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuarios.service';
import { LocalStorageService } from '../shared/localstorage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html', 
	styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {

	nome = "";
	cpf = "";
	numero: string = "";
	email = "";
	termo = false;
	usuario: Usuario;
	telefones: Telefone[] = [];
	resp: string = '';
	resp1: string;

	public cpfMask = [/[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
	public telMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	tabBarElement: any;

	constructor(private usuarioService: UsuarioService,
		private toastCtrl: ToastController,
		public alertController: AlertController,
		private router: Router,
		public localStorage: LocalStorageService,

		
		
	) {
		this.usuario = new Usuario();
		this.usuario.telefones[0] = new Telefone();
	}
	

	
	
		
		
	ngOnInit() {
		if (localStorage.getItem('email')){
			this.navigate("home");
		}else{
			const tabs = document.querySelectorAll('ion-tab-bar');
			Object.keys(tabs).map((key) => {
			  tabs[key].style.display = 'none';
			});
		}
		
	}



	cadastrarLocal() {
		console.log(this.usuario.telefones[0].numero);
		this.usuarioService.enviarsms(this.usuario.telefones[0].numero).subscribe(res => {
			this.resp1 = res;
			this.localStorage.set("numero", this.resp1);
			console.log(this.resp1);
		})
		this.resp = this.usuarioService.gravarStorage(this.usuario);
		this.openModalValidarCodigo();
	}


	// realValueCpf(): string {
	// 	let myCpf = this.cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", "");
	// 	while (myCpf.includes("_")) {
	// 		myCpf = myCpf.replace("_", "");
	// 	}
	// 	return myCpf;
	// }

	// realValueTel(): string {
	// 	let myTel = this.numero.replace(' ', '').replace(' ', '').replace('-', '').replace('(', '').replace(')', '');
	// 	while (myTel.includes("_")) {
	// 		myTel = myTel.replace("_", "");
	// 	}
	// 	console.log("Dados do telefone");
	// 	console.log(myTel);
	// 	return myTel;
	// }

	async presentToast(message: string) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});
		(await toast).present();
	}

	tratarNumero(numero: string) {
		const result = numero.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
		return '+55' + result;
	}

	navigate(route: string, mydata?: any) {
		if (!mydata) {
			this.router.navigate([route]);
		} else {
			this.router.navigate([route], { queryParams: { data: mydata } });
		}
	}


	


	async openModalValidarCodigo() {
		// this.storeService.numeroTelefone = this.numero;
		const alert = await this.alertController.create({
			message: "Informe o código enviado por SMS",
			inputs: [
				{
					name: "codigo",
					type: "number"
				},
			],
			buttons: [
				{
					text: "Enviar",
					handler: () => {
						this.alertController.dismiss({ "navigation": true });
						alert.onDidDismiss().then((obj) => {
							console.log("1", obj.data.values.codigo);
							try {
								this.usuarioService.gravarDatabase(+obj.data.values.codigo).subscribe(res => {
									if (res == null) {
										throw new Error("Código inválido");
									}
									this.presentToast("Gravado com sucesso");
								},
									error => {
										this.presentToast("Código inválido");
									}
								);
								this.navigate("politica-privacidade");
							} catch (error) {
								this.presentToast("Código caiu no catch ");
							}
						})


					}
				}
			]
		});
		await alert.present();
	}


	


}
