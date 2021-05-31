import { Sms } from './sms';

export class DtoUsuario{

    	
        nome : string;
	    cpf : string ;
	    email : string;
        numero : string;
	    termo : number;
        sms : number;
        resposta : string;
        DtoUsuario : number;
        
	static sms: number;
	static enviarSmsLogar: number;
	resp1: number;
        
        constructor(nome ?: string, cpf ?: string, numero?: string, email?: string, termo?: number, sms?: number) {
            this.nome  = nome ;
            this.numero = numero;
            this.cpf = cpf;
            this.email = email;
            this.termo = termo;
            this.sms = sms;
           
            
            
        }
    
 

}