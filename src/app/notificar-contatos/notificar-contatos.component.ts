import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { StoreService2 } from '../shared/store.service';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
	selector: 'app-notificar-contatos',
	templateUrl: './notificar-contatos.component.html',
	styleUrls: ['./notificar-contatos.component.css']
})
export class NotificarContatosComponent implements OnDestroy, OnInit {

	iframeLink = "";
	public allContacts: Contacts[];
	public emails: string[] = [];
	mobile: boolean;
	isValid: number = 0;


	constructor(public storeService: StoreService2,
		public myLocalStorage: LocalStorageService,
		public numerosClonadosService: NumerosClonadosService,
		public androidPermissions: AndroidPermissions,
		public router: Router,
		private contacts: Contacts,
		private sms: SMS
	) {

	}

	ngOnInit(): void {
		if (window.screen.width <= 400) {
			this.mobile = true;
		}
		//this.obterContatos2();
	}

	tratarNumero(numero: string) {
		const result = numero.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
		return '+55' + result;
	}

	notificarContatos(msg: string) {
		this.openGoogleApi();
	}

	notificarContatos2() {
		// this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_CONTACTS).then(() => {
		this.router.navigate(['notificar2']);
		// })
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

	obterContatos2() {
		this.navigate("contatosNotificados");

		let msg: string = "";
		// msg = "Olá, o Celular do(a) " +
		// 	this.myLocalStorage.get("nome") + " com o número de telefone " +
		// 	this.myLocalStorage.get("celular") + " foi clonado, tome cuidado ao receber mensagens! Avise os familiares e amigos do ocorrido para a segurança de todos.";
		msg = "Olá, teste de programação!"
		this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], { multiple: true, hasPhoneNumber: true })
			.then(data => {
				//	this.allContacts =  data;
			for (let i = 0; i < data.length; i++) {
			  this.sms.send(data[i].phoneNumbers[0].value, msg);
			//  if ( data[i].displayName == "Pai Samsung" ) {
					
		//for (let j = 0; j < data[i].phoneNumbers.length; j++) {
						//	this.sms.send(data[i].phoneNumbers[0].value, msg);
							
						
				      // }

				this.navigate("contatosNotificados");
			
			}
			
				this.navigate("contatosNotificados");
		 } ).catch((err) => {
				this.isValid = -1;
			});
			
	}



	navigate(route: string, mydata?: any) {
		if (!mydata) {
			this.router.navigate([route]);
		} else {
			this.router.navigate([route], { queryParams: { data: mydata } });
		}
	}


	// enviarSMS(numero: string) {
	// 	this.sms.send('416123456', 'Hello world!');
	// }


	obterNumerosPorContato(contatos: any): any {
		let telefonesContatos: any;
		if (contatos && contatos.phoneNumbers.length > 0) {
			for (let i = 0; i < contatos.phoneNumbers.length; i++) {
				if (contatos.displayName != null) {
					var obj = {};
					obj["nome"] = contatos.displayName;
					obj["telefones"] = contatos.phoneNumbers[i];
					telefonesContatos.push(contatos);
				}
			}
		}
		return telefonesContatos;
	}

	obterNumerosPorContatoUltimo(contatos: any[]) {
		let telefonesContatos = []
		if (contatos && contatos.length > 0) {
			contatos.forEach(contato => {
				if (contato.hasOwnProperty('gd:phoneNumber')) {
					let contatoObj = { nome: contato.title[0]._, telefones: [] }
					let numeros = []
					contato['gd:phoneNumber'].forEach(numero => {
						numeros.push(numero._)
					});
					contatoObj.telefones = numeros
					telefonesContatos.push(contatoObj)
				}
			});
		}
		return telefonesContatos
	}

}
