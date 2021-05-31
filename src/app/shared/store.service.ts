import { Injectable } from '@angular/core';

@Injectable()
export class StoreService2 {
    registroUsuario: any;
    modalEnviarError: boolean;
    modalBuscarNumeroError: boolean;
    modalBuscarNumeroValue: string;
    modalBuscarMsg: string;
    numeroTelefone: string;
    numeroTelefoneCompleto: string;
    notificarContatos: boolean;
}
