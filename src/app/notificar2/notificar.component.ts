import { UsuarioService } from './../service/usuarios.service';
import { Sms } from './../model/sms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Telefone } from '../model/telefone';
import { Usuario } from '../model/usuario';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { StoreService2 } from '../shared/store.service';

@Component({
	selector: 'app-notificar',
	templateUrl: './notificar.component.html',
	styleUrls: ['./notificar.component.css']
})
export class NotificarComponent implements OnDestroy, OnInit {
	sms: Sms[] = [];
	nome = "";
	cpf = "";
	numero: string = "";
	email = "";
	termo = false;
	usuario: Usuario;
	telefones: Telefone[] = [];
	iframeLink = "";
	public allContacts: any;
	public emails: string[] = [];

	public telMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

	constructor(public storeService: StoreService2,
		public localStorage: LocalStorageService,
		public numerosClonadosService: NumerosClonadosService,
		public androidPermissions: AndroidPermissions,
		private service: UsuarioService,
		public router: Router) {
			this.usuario = new Usuario();
			this.usuario.telefones[0] = new Telefone();
			this.sms.push(new Sms());
			this.sms.push( new Sms());
			this.sms.push( new Sms());
			this.sms.push( new Sms());
			this.sms.push( new Sms());
	}

	ngOnInit(): void {
		this.carregarSms();
	}

	carregarSms(){
		this.sms[0].nomeClonado = this.localStorage.get("nome");
		this.sms[0].telefoneClonado = this.localStorage.get("celular");

		this.sms[1].nomeClonado = this.localStorage.get("nome");
		this.sms[1].telefoneClonado = this.localStorage.get("celular");

		this.sms[2].nomeClonado = this.localStorage.get("nome");
		this.sms[2].telefoneClonado = this.localStorage.get("celular");

		this.sms[3].nomeClonado = this.localStorage.get("nome");
		this.sms[3].telefoneClonado = this.localStorage.get("celular");

		this.sms[4].nomeClonado = this.localStorage.get("nome");
		this.sms[4].telefoneClonado = this.localStorage.get("celular");
	}

	tratarNumero(numero: string) {
		const result = numero.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
		return '+55' + result;
	}

	// notificarContatos(msg: string) {
	// 	this.openGoogleApi();
	// }

	//Aqui2
	notificarContatos2() {
		// this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_CONTACTS).then(() => {
		// 	this.router.navigate(['contatoApi']);
		// })
		this.service.enviarSmsVarios(this.sms).subscribe(res => {
			// console.log("foi");
		
		})
		this.navigate('contatosNotificados');
	}


	openGoogleApi() {
		const clientId = '464781618950-f2b0bp5aubjdicbfj10kv7lqejv888vs.apps.googleusercontent.com';
		//const clientId = '464781618950-1cf7iajthqkv75qhbpr0216e43pf8lra.apps.googleusercontent.com';
		const redirectUrl = 'https://fuiclonado.com.br/contatosApi'
		//const redirectUrl = 'br.com.fuiclonado'
		//let url = window.location.href;
		window.location.href = "https://accounts.google.com/o/oauth2/auth?redirect_uri=" + redirectUrl + "&response_type=code&client_id=" + clientId + "&scope=https://www.google.com/m8/feeds/&approval_prompt=force&access_type=offline";
	}

	resetValues() {
		this.storeService.registroUsuario = {};
		this.storeService.modalEnviarError = false;
		this.storeService.modalBuscarNumeroError = false;
		this.storeService.modalBuscarNumeroValue = '';
		this.storeService.modalBuscarMsg = '';
		this.storeService.numeroTelefone = '';
		this.storeService.notificarContatos = false;
	}

	onSubmit(form) {

	}

	ngOnDestroy() {
		this.resetValues();
	}

	navigate(route: string, mydata?: any) {
		if (!mydata) {
			this.router.navigate([route]);
		} else {
			this.router.navigate([route], { queryParams: { data: mydata } });
		}
	}


}
