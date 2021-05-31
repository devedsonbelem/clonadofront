import { Telefone } from '../model/telefone';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from '../model/usuario';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { UsuarioService } from '../service/usuarios.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { StoreService2 } from '../shared/store.service';

@Component({
	selector: 'app-alterar',
	templateUrl: './alterar.page.html',
	styleUrls: ['./alterar.page.scss'],
})
export class AlterarPage implements OnInit {

	nome: string;
	cpf: string;
	numero: string;
	email: string;
	termo = false;
	usuario: Usuario;
	telefones: Telefone[] = [];
	resp: string = '';
	celular: string;

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
		this.resgataDados();
	}

	alterar() {
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

	realValueCpf(): string {
		let myCpf = this.cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", "");
		while (myCpf.includes("_")) {
			myCpf = myCpf.replace("_", "");
		}
		return myCpf;
	}

	realValueTel(): string {
		let myTel = this.numero.replace(' ', '').replace(' ', '').replace('-', '').replace('(', '').replace(')', '');
		while (myTel.includes("_")) {
			myTel = myTel.replace("_", "");
		}
		console.log("Dados do telefone");
		console.log(myTel);
		return myTel;
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

	resgataDados() {
		this.nome = this.localStorage.get("nome");
		this.cpf = this.localStorage.get("cpf");
		this.celular = this.localStorage.get("celular");
		this.email = this.localStorage.get("email");
	}

}
