import { Telefone } from "./telefone";

export class Usuario {
	telefone(arg0: string, telefone: any) {
		throw new Error('Method not implemented.');
	}

    idUsuario: number;
    nome: string;
    cpf: string;
    email: string;
    sms: string;
    senha: string;
    termo: number;
    token: string;

    telefones: Telefone[]=[];

    constructor(idUsuario?: number, nome?: string, cpf?: string, email?: string, sms?: string, senha?: string, termo?: number, token?: string) {
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.sms = sms;
        this.senha = senha;
        this.termo = termo;
        this.token = token;
    }
}