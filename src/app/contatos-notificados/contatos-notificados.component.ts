import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { imageSourceToPath } from 'cordova-res/dist/platform';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { StoreService2 } from '../shared/store.service';
import { LoadingController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
	selector: 'app-contatos-notificados',
	templateUrl: './contatos-notificados.component.html',
	styleUrls: ['./contatos-notificados.component.css']
})


export class ContatosNotificadosComponent implements OnDestroy, OnInit {

	iframeLink = "";
	public allContacts: any;
    private socialSharing: SocialSharing;
	title = 'tempo';
	interval;
	timeLeft: number = 0;
	enable : boolean = true;
	public emails: string[] = [];
//	url = 'https://www.facebook.com/dialog/share?href=https://fuiclonado.com.br&app_id=273928910598923';
url = 'https://www.facebook.com/dialog/share?href=https://fuiclonado.com.br/wp-content/uploads/2021/05/Site-Fui-Clonado.jpg&app_id=273928910598923';

	constructor(public storeService: StoreService2,
		public myLocalStorage: LocalStorageService,
		public numerosClonadosService: NumerosClonadosService,
		public androidPermissions: AndroidPermissions,
		public loadingController: LoadingController,
		public router: Router) {

	}

	ngOnInit(): void {
//	console.log("Inicio ...");
	this.presentLoading();
		
	}

	async presentLoading() {
		const loading = await this.loadingController.create({
		  cssClass: 'my-custom-class',
		  message: 'Notificando seus contatos!',
		  duration: 4000
		});
		await loading.present();
	
		const { role, data } = await loading.onDidDismiss();
		console.log('Loading dismissed!');
	  }
	



	// startTimer() {
	// 	this.interval = setInterval(() => {
	// 	  if(this.timeLeft >= 0 && this.timeLeft<5) {
	// 			this.timeLeft++;
	// 			this.enable = true;
	// 	  } else {
	// 		this.timeLeft=0;
	// 		this.enable =  false;
	// 		this.pauseTimer();
	// 	  }
	// 	},1000);
	//   }
	
	  
	
	//   pauseTimer() {
	// 	clearInterval(this.interval) ;
	//   }
	 
	//   zerarTimer(){
	// 	this.timeLeft=0;
	//   }
	

	tratarNumero(numero: string) {
		const result = numero.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
		return '+55' + result;
	}

	notificarContatos(msg: string) {
		this.openGoogleApi();
	}

	//Aqui
	notificarContatos2() {
		this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_CONTACTS).then(() => {
			this.router.navigate(['contatoApi']);
		})
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



	
	openShareDialog() {
		const availHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight);
		const width = 520;
		const height = Math.min(availHeight, 600);
		const top = (availHeight / 2) - (height / 2);
		const left = (window.screen.availWidth / 2) - (width / 2);
		window.open(this.url,  '_blank', `height=${height}, width=${width},top=${top},left=${left}`);
	}
}
