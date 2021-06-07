import { LocalStorageService } from './../shared/localstorage.service';
import { Usuario } from './../model/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Telefone } from '../model/telefone';
import { Sms } from '../model/sms';
import { DtoUsuario } from '../model/dtousuario';

// const baseURL = 		"http://fuiclonado.com.br:4618/api/gravar";
// const URLTEL = 			"http://fuiclonado.com.br:4618/telefones/salvaralterarclonado";
// const URLVERIFICAR = 	"http://fuiclonado.com.br:4618/telefones/verificar";
// const URLRECUPEREI = 	"http://fuiclonado.com.br:4618/telefones/recuperei";
// const URLALTERAR = 		"http://fuiclonado.com.br:4618/api/alterar?email";
// const URLSMS = 			'http://fuiclonado.com.br:4618/message/sends?Authorization=Basic QUNlMTIxZDA4YjY5MDRlMWE3OGMwOWJiZWQ5MDBkNzBlNjphM2VhZjllMjRmZDVmZjQ4Y2Y4ZjJlY2VhMGViYjFiZg==&to';
// const URLSMSVARIOS = 	'http://fuiclonado.com.br:4618/message/sendsNome?Authorization=Basic QUNlMTIxZDA4YjY5MDRlMWE3OGMwOWJiZWQ5MDBkNzBlNjphM2VhZjllMjRmZDVmZjQ4Y2Y4ZjJlY2VhMGViYjFiZg==&to';

const baseURL = 		"http://207.244.229.206:4618/api/gravar";
const NOVOTELURL = 		"http://207.244.229.206:4618/api/cadastrar/novo";
const baseLogin = 		"http://207.244.229.206:4618/api/logar/login";
const URLTEL = 			"http://207.244.229.206:4618/telefones/salvaralterarclonado";
const URLVERIFICAR = 	"http://207.244.229.206:4618/telefones/verificar";
const URLRECUPEREI = 	"http://207.244.229.206:4618/telefones/recuperei";
const URLALTERAR = 		"http://207.244.229.206:4618/api/alterar?email";
const URLSMS = 			'http://207.244.229.206:4618/message/sends?Authorization=Basic QUNlMTIxZDA4YjY5MDRlMWE3OGMwOWJiZWQ5MDBkNzBlNjphM2VhZjllMjRmZDVmZjQ4Y2Y4ZjJlY2VhMGViYjFiZg==&to';
const URLSMSVARIOS = 	'http://207.244.229.206:4618/message/sendsNome?Authorization=Basic QUNlMTIxZDA4YjY5MDRlMWE3OGMwOWJiZWQ5MDBkNzBlNjphM2VhZjllMjRmZDVmZjQ4Y2Y4ZjJlY2VhMGViYjFiZg==&to';


@Injectable({
	providedIn: 'root'
})

export class UsuarioService {

	dto: number;
	alertController: any;

	gravarDatabaseTelefones(telefone: Telefone) {
		throw new Error('Method not implemented.');
	}

	jatenhoconta(usuario: Usuario) {
		throw new Error('Method not implemented.');
	}

	private corsHeaders: HttpHeaders;

	constructor(private http: HttpClient,
		public localStorage: LocalStorageService) {
		this.corsHeaders = new HttpHeaders({
			'Access-Control-Allow-Headers': 'Content-Type',
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
			'Access-Control-Allow-Origin': '*'
		});
	}

	public gravarStorage(usuario: Usuario): string {
		this.localStorage.set("ITEM", JSON.stringify(usuario));
		this.localStorage.set("email", usuario.email);
		this.localStorage.set("nome", usuario.nome);
		this.localStorage.set("cpf", usuario.cpf);
		this.localStorage.set("celular", usuario.telefones[0].numero);
		return "storage ok";
	}

	public gravarStorageDto(dto: DtoUsuario): string {
		this.localStorage.set("ITEM", JSON.stringify(dto));
		this.localStorage.set("email", dto.email);
		this.localStorage.set("nome", dto.nome);
		this.localStorage.set("cpf", dto.cpf);
		this.localStorage.set("celular", dto.numero);
		this.localStorage.set("sms", dto.sms);
		return "storage ok";
	}

	public gravarDatabase(numero: number) {
		let header = { "headers": { "Content-Type": "application/json", "charset": "utf-8" } };
		let usu: Usuario = this.localStorage.get("ITEM");
		let num: number = this.localStorage.get("numero");

		if (numero === num) {
			console.log("um", num);
			console.log("usuario", usu);
			return this.http.post<Usuario>(`${baseURL}`, usu, header);
		} else {
			console.log("dois", num);
			return null;
		}
	}

	public cadastrarnum(numero: number) {
		let header = { "headers": { "Content-Type": "application/json", "charset": "utf-8" } };
		let email: string = this.localStorage.get("email");
		let telefone: Telefone = new Telefone();
		telefone.numero = this.localStorage.get("numero");
		return this.http.post<Telefone>(`${NOVOTELURL}?email=${email}`, telefone, header);
	}

	public logarDatabase(dto: DtoUsuario) {
		let header = { "headers": { "Content-Type": "application/json", "charset": "utf-8" } };
		return this.http.post<DtoUsuario>(`${baseLogin}`, dto, header);
	}

	public confirmarLogin(numero: number) {
		let header = { "headers": { "Content-Type": "application/json", "charset": "utf-8" } };
		let usu: Usuario = this.localStorage.get("ITEM");
		let num: number = this.localStorage.get("numero");

		if (numero === num) {
			console.log("um", num);
			console.log("usuario", usu);
			return this.http.post<Usuario>(`${baseLogin}`, num, header);
		} else {
			console.log("dois", num);
			return null;
		}
	}

	public gravarDatabaseTelefone(telefone: Telefone) {
		let headers1 = new Headers();
		headers1.append('Content-Type', 'application/json');
		let email: string = this.localStorage.get("email");
		let celular: any = this.localStorage.get("celular");
		if (telefone.numero == celular) {
			return this.http.post<Telefone>(`${URLTEL}?email=${email}`, telefone);
		}
	}

	public gravarDatabaseTelefonenovo(telefone: Telefone) {
		let headers1 = new Headers();
		headers1.append('Content-Type', 'application/json');
		let email: string = this.localStorage.get("email");
		let celular: any = this.localStorage.get("celular");
		if (telefone.numero == celular) {
			return this.http.post<Telefone>(`${URLTEL}?email=${email}`, telefone);
		}
	}

	public verificarNumero(telefone: Telefone) {
		return this.http.post<Telefone>(`${URLVERIFICAR}`, telefone);
	}

	public recupereiNumero(telefone: Telefone) {
		let headers1 = new Headers();
		headers1.append('Content-Type', 'application/json');
		let email: string = this.localStorage.get("email");
		let celular: any = this.localStorage.get("celular");
		if (telefone.numero == celular) {
			return this.http.post<Telefone>(`${URLRECUPEREI}?email=${email}`, telefone);
		}
	}

	public alterar(usuario: Usuario) {
		let email: string = this.localStorage.get("email");
		return this.http.post<Usuario>(`${URLALTERAR}=${email}`, usuario);
	}

	public enviarsms(cod: string) {
		return this.http.post<string>(`${URLSMS}=${cod}`, "");
	}

	public enviarSmsVarios(sms: Sms[]) {
		return this.http.post<string>(`${URLSMSVARIOS}`, sms);
	}

	public enviarSmsLogar(cod: string) {
		return this.http.post<string>(`${URLSMS}=${cod}`, "");
	}

}
