import { Sms } from './../model/sms';
import { Telefone } from './../model/telefone';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from '../model/usuario';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { UsuarioService } from '../service/usuarios.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { StoreService2 } from '../shared/store.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
	selector: 'app-novotel',
	templateUrl: './novotel.page.html',
	styleUrls: ['./novotel.page.scss'],
	
})
export class NovotelPage implements OnInit {

	nome: string;
	cpf: string;
	numero: string;
	email: string;
	termo = false;
	usuario: Usuario;
	telefones: Telefone[] = [];
	resp: string = '';
	celular: string;
	resp1: string;
	private service: UsuarioService;

	telefone : Telefone=new Telefone(); 


	public cpfMask = [/[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
	public telMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

	constructor(private usuarioService: UsuarioService,
		private toastCtrl: ToastController,
		public alertController: AlertController,
		private router: Router,
		public localStorage: LocalStorageService) {
		this.usuario = new Usuario();
		this.usuario.telefones[0] = new Telefone();
		
	}

	ngOnInit() {
	
	}

	novotel() {
		this.usuario.email = this.localStorage.get('email');
		this.usuarioService.alterar(this.usuario).subscribe(res => {
			if (res == null) {
				this.presentToast("Dados não alterados");
			}
		});
		this.presentToast("Dados alterados");
		this.localStorage.set("email", this.usuario.email);
		this.localStorage.set("nome", this.usuario.nome);
		this.localStorage.set("cpf", this.usuario.cpf);
	}


	










	
	async presentToast(message: string) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});
		(await toast).present();
	}







	cadastrarnum(){

		    this.email = localStorage.getItem("email");
 			this.usuarioService.enviarsms(this.telefone.numero).subscribe(res => {
			this.resp1 = res;
			this.localStorage.set("sms", this.resp1);
			this.localStorage.set("numero", this.telefone.numero);
			console.log(this.resp1);


			
			})	
			this.openModalValidarCodigonovotel();	
	}

	
		
	async openModalValidarCodigonovotel() {
 
		const alert = await this.alertController.create({
			message: "Informe o código enviado por SMS",
			inputs: [
				{
					name: "codigo",
					type: "number",
					
				},
			],
			buttons: [
				{
					text: "Enviar",
					handler: () => {
						this.alertController.dismiss({ "navigation": true });
						alert.onDidDismiss().then((obj) => {
							console.log("1", obj.data.values.codigo);
							
							if (this.resp1 == null) {
										this.presentToast("Erro no código enviado!");
										throw new Error("Código inválido 222");
									}  else if (this.resp1 != obj.data.values.codigo)  {
										
										this.presentToast("Erro no código enviado!");
										throw new Error("Código inválido 333");
									
								}
								this.presentToast("Gravado com sucesso!");
								this.navigate("home");
								this.usuarioService.cadastrarnum(+obj.data.values.codigo).subscribe(res => {
								
								
						})
					}

						)}
			}
				
			]
		});
		await alert.present();
	
	}









	navigate(route: string, mydata?: any) {
		if (!mydata) {
			this.router.navigate([route]);
		} else {
			this.router.navigate([route], { queryParams: { data: mydata } });
		}
	}

}

function subscribe(arg0: (res: any) => void, arg1: (error: any) => void) {
	throw new Error('Function not implemented.');
}
