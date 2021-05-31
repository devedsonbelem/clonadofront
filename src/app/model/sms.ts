export class Sms {

    nomeClonado: string;
    telefoneClonado: string;
    nome: string;
    to: string;
   
    constructor(nomeClonado?: string, telefoneClonado?: string, nome?: string, to?: string) {
        this.nomeClonado = nomeClonado;
        this.telefoneClonado = telefoneClonado;
        this.nome = nome;
        this.to = to;
    }


}