import { Component, OnInit, TemplateRef } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';
import { NumerosClonadosService } from '../service/numeros-clonados.service';
import { StoreService2 } from '../shared/store.service';

@Component({
  selector: 'app-contato-wpp',
  templateUrl: './contatoWpp.component.html',
  styleUrls: ['./contatoWpp.component.css']
})

export class ContatoWppComponent implements OnInit {

    mobile: boolean;
    public allContacts: any

    isValid: number=0;
    url = 'https://www.facebook.com/dialog/share?href=https://fuiclonado.com.br&app_id=273928910598923';

    constructor(
                private numerosClonadosService: NumerosClonadosService,
                private storeService: StoreService2,
                private contacts : Contacts) { }

    ngOnInit() {
        if (window.screen.width <= 400) {
            this.mobile = true;
        }
        this.obterContatos2();
    }

    openGoogleApi() {
        const clientId = '464781618950-f2b0bp5aubjdicbfj10kv7lqejv888vs.apps.googleusercontent.com';
        // const redirectUrl = 'https://fuiclonadoarq.herokuapp.com/contatosApi';
        const redirectUrl = 'https://fuiclonado.com.br/contatosApi'

        window.location.href = "https://accounts.google.com/o/oauth2/auth?redirect_uri="+redirectUrl+"&response_type=code&client_id=" + clientId + "&scope=https://www.google.com/m8/feeds/&approval_prompt=force&access_type=offline";
    }


    obterQueryString() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
    }

    obterContatos(bearer: string, refreshTokenResp: string, accessTokenResp: string) {
        const refreshToken = refreshTokenResp;
        const accessToken = accessTokenResp;
        const scope = 'https://www.google.com/m8/feeds/contacts/default/full/';

        this.numerosClonadosService.getContatosGoogle(scope, bearer, accessToken).subscribe(respCon => {
            this.enviarSMS(this.obetNumerosPorContato(respCon.data))
        });
    }

    obterContatos2(){
     this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {multiple: true, hasPhoneNumber: true})
     .then(data => {
       this.allContacts = data;
       for(let i=0; i < data.length;i++){
           if(this.obterNumerosPorContato(data[i]).length  > 0){
            this.enviarSMS(this.obterNumerosPorContato(data[i]));
           }
       }
        this.isValid = 1;
     }).catch((err)=>{
        this.isValid = -1;
     });   
    }

    obterNumerosPorContato(contatos : any){
        let telefonesContatos=[];
        if(contatos && contatos.phoneNumbers.length > 0){
            for(let i=0; i<contatos.phoneNumbers.length;i++){
                if(contatos.displayName != null){
                    var obj ={};
                    obj["nome"] = contatos.displayName;
                    obj["telefones"] = contatos.phoneNumbers[i];
                    telefonesContatos.push(obj);
                }
            }
        }
        return telefonesContatos;
    }

    obetNumerosPorContato(contatos: any[]) {
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

    enviarSMS(contatos) {
        let telArray = []
       
            if(contatos[0].telefones.value.length > 7){
                telArray.push(this.tratarNumeroTelefone(contatos[0].telefones.value));
            }
       
         if(telArray !=[] || telArray[0].length > 0){
            this.numerosClonadosService.enviarMensagemSMSOnly(telArray, 'Desconsiderar esta mensagem. Programador testando.', window.location.href).subscribe(res => {});
         }
        
    }


    tratarNumeroTelefone(numero) {
        let numeroTratado
        if (numero.includes('+55'))
            numeroTratado = numero.replace(' ', '').replace(' ', '').replace('-', '').replace('(','').replace(')','');
        else if(!numero.includes('+55') && !numero.includes("+"))
            numeroTratado = '+55' + numero.replace(' ', '').replace(' ', '').replace('-', '').replace('(','').replace(')','');
        
        return numeroTratado
    }

    onSubmit(form) {
    }

    openShareDialog() {
        const availHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight);
    
        const width = 520;
        const height = Math.min(availHeight, 600);
        const top = (availHeight / 2) - (height / 2);
        const left = (window.screen.availWidth / 2) - (width / 2);
    
        window.open(this.url, '_blank', `height=${height}, width=${width},top=${top},left=${left}`);
      }
}
