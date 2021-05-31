import { Usuario } from './model/usuario';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './shared/localstorage.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

	nome: string;
	email: string;
	cpf: string;
	celular: string;
	usuario: Usuario;

	constructor(private localStorage: LocalStorageService) {
	 
	}

	ngOnInit(): void {
		this.resgataDados();
	}

	resgataDados() {
		this.nome = this.localStorage.get("nome");
		this.email = this.localStorage.get("email");
		this.cpf = this.localStorage.get("cpf");
		this.celular = this.localStorage.get("celular");
	}

	
}
