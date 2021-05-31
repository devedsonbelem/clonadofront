import { Sms } from './../model/sms';
import { Telefone } from './../model/telefone';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuarios.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { DtoUsuario } from '../model/dtousuario';

@Component({
	selector: 'app-jatenhoconta',
	templateUrl: './jatenhoconta.page.html', 
	styleUrls: ['./jatenhoconta.page.scss'],
})
export class JatenhocontaPage implements OnInit {

	nome = "";
	cpf = "";
	numero:  "";
	email = "";
	termo = false;
	telefone : Telefone= new Telefone();
	usuario: Usuario;
	telefones: Telefone[] = [];
	dto : DtoUsuario =new DtoUsuario();
	

	resp: string = '';
	resp1: string;
	

	public cpfMask = [/[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
	public telMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	sms: Number;

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
	}


	logarLocal() {

		
		this.usuarioService.logarDatabase(this.dto).subscribe(res => {
			console.log(res);
            
	
			this.usuarioService.enviarsms(this.dto.numero).subscribe(res => {
			this.resp1 = res;
			this.localStorage.set("numero", this.resp1);
			console.log(this.resp1);

			})
			
			this.usuarioService.gravarStorageDto(res);
			this.openModalValidarCodigoLogin();	
			
		})
 
	
	}
 

 

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

	async openModalValidarCodigoLogin() {
 
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
							try {
								this.usuarioService.confirmarLogin(+obj.data.values.codigo).subscribe(res => {
									if (res == null) {
										this.presentToast("erro no código");
										throw new Error("Código inválido 222");
									} else if (this.dto)  {
										
										this.presentToast("erro no código");
										throw new Error("Código inválido 333");
									
								}

								this.presentToast("Gravado com sucesso");
									

							},
									error => {
										this.navigate("home");
										this.presentToast("Acesso Confirmado!");
									}
								);
						
								
							} catch (error) {
								this.presentToast("Código inválido!");
							}
						})


					}
				}
			]
		});
		await alert.present();
	}
}
