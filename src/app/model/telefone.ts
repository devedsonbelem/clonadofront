export class Telefone {
	telefone(telefone: any) {
		throw new Error('Method not implemented.');
	}

    idTelefone: number;
    numero: string;
    status: string;
	resp1: any;

    constructor(idTelefone?: number, numero?: string, status?: string) {
        this.idTelefone = idTelefone;
        this.numero = numero;
        this.status = status;
    }

}