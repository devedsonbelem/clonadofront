import { UsuarioService } from './../service/usuarios.service';
import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { validate } from 'gerador-validador-cpf';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { StoreService2 } from '../shared/store.service';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Usuario } from '../model/usuario';
import { Telefone } from '../model/telefone';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	nome = "";
	numero = "";
	email = "";
	cpf = "";
	termo = false;
	executei: boolean = false;
	codigo = "";
	usuario: Usuario;
	telefone: Telefone;
	celular: string;

	public cpfMask = [/[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
	public telMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	resp1: any;

	constructor(private numerosClonadosService: NumerosClonadosService,
		private storeService: StoreService2,
		private service: UsuarioService,
		private router: Router,
		public alertController: AlertController,
		public localStorage: LocalStorageService,
		public toastCtrl: ToastController,
		private sms: SMS,
		public androidPermissions: AndroidPermissions) {
			this.usuario = new Usuario();
			this.telefone = new Telefone();
	}

	ngOnInit(): void {
		this.gerarCodigo();
	}
	validarCpf = (cpf) => {
		return validate(cpf);
	}

	tratarNumero(numero: string) {
		const result = numero.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
		return '+55' + result;
	}

	getRandomInt(min, max): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	gerarCodigo() {
		for (let i = 0; i < 3; i++) {
			this.codigo += this.getRandomInt(0, 100).toString().padStart(2, "0");
		}
	}

	cadastrar() {

		this.celular = this.localStorage.get("celular");
		let celular: any = this.localStorage.get("celular");
		try {
			this.service.gravarDatabaseTelefone(this.telefone).subscribe(res => {
				if(res.status == "clonado"){
					console.log(this.resp1);
					this.presentToast("Telefone Clonado");
				    this.navigate("notificarContatos");
			}	
		}) 
	}catch{
			this.modalNumeroInvalido();
		}		
	}



	async modalNumeroInvalido() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			message: 'Você só pode cadastrar o seu número como clonado!',
			buttons: ['OK']
		});
		await alert.present();
		// const { role } = await alert.onDidDismiss();
		// console.log('onDidDismiss resolved with role', role);
	}


	async presentToast(message: string) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});
		(await toast).present();
	}

	async openModalValidarCodigo() {
		this.storeService.numeroTelefone = this.numero;
		const alert = await this.alertController.create({
			message: "Informe o código enviado por SMS",
			inputs: [
				{
					name: "codigo",
					type: "text"
				}
			],
			buttons: [
				{
					text: "Enviar",
					handler: () => {
						this.alertController.dismiss({ "navigation": true });
						alert.onDidDismiss().then((obj) => {
							this.verificarCodigo(obj.data.values.codigo);
							this.navigate("notificarContatos");
						})
					}
				}
			]
		});
		await alert.present();
	}

	verificarCodigo(codigo: string, data?: any) {
		const NUMERO = this.tratarNumero(this.numero);
		this.numerosClonadosService.verificarCodigoUsuario(
			NUMERO,
			codigo,
			window.location.href).subscribe(res => {
				this.localStorage.set("notificarContatos", res.status === 200 ? true : false);
				this.localStorage.set("verificacao", { "nome": this.nome, "cpf": this.cpf, "numero": this.numero, "email": this.email, "termo": this.termo })
				this.numerosClonadosService.salvarRegistro(
					this.nome,
					this.cpf,
					this.numero,
					this.email,
					this.termo + "",
					window.location.href).subscribe(salvarRegistroResp => {


					});
			}, (error) => {
				console.log("Error: ", error);
			});
	}

	navigate(route: string, mydata?: any) {
		if (!mydata) {
			this.router.navigate([route]);
		} else {
			this.router.navigate([route], { queryParams: { data: mydata } });
		}
	}


	resgataDados() {
		this.nome = this.localStorage.get("nome");
		this.email = this.localStorage.get("email");
		this.cpf = this.localStorage.get("cpf");
		this.celular = this.localStorage.get("celular");
	}

	

}


