import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NumerosClonadosService {

  constructor(private http: HttpClient) { }
  baseURL = "https://fuiclonadoapi.kinghost.net/";

  public openGoogleApi(redirectUrl: string, clientId: string) {
    return this.http.get<Observable<any>>("https://accounts.google.com/o/oauth2/auth?redirect_uri=" + redirectUrl + "&response_type=code&client_id=" + clientId + "&scope=https://www.google.com/m8/feeds/&approval_prompt=force&access_type=offline");
  }

  public salvarRegistro(nome: string, cpf: string, numero: string, email: string, termo: string, url: string): Observable<any> {
    if (url.indexOf('fuiclonado.com.br') > -1) {
      return this.http.post<Observable<any>>('http://localhost:2100/numeroClonado', { nome, cpf, numero, email, termo });
    } else {
      return this.http.post<Observable<any>>(`${this.baseURL}numeroClonado`, { nome, cpf, numero, email, termo });
    }
  }

  public buscarNumero(numero: string, url: string): Observable<any> {
    if (url.indexOf('fuiclonado.com.br') > -1) {
      return this.http.get<Observable<any>>(`http://localhost:2100/numeroClonado/${numero}`);
    } else {
      return this.http.get<Observable<any>>(`${this.baseURL}numeroClonado/${numero}`);
    }
  }

  public deletarNumero(numero: string, url: string): Observable<any> {
    if (url.indexOf('fuiclonado.com.br') > -1) {
      return this.http.delete<Observable<any>>(`http://localhost:2100/numeroClonado/${numero}`);
    } else {
      return this.http.delete<Observable<any>>(`${this.baseURL}numeroClonado/${numero}`);
    }
  }

  public enviarEmail(from: string, subject: string, msg: string, url: string): Observable<any> {
    if (url.indexOf('fuiclonado.com.br') > -1) {
      return this.http.post<Observable<any>>('http://localhost:2100/sendMail', { from, subject, msg });
    } else {
      return this.http.post<Observable<any>>(`${this.baseURL}sendMail`, { from, subject, msg });
    }
  }

  public verificarUsuario(phoneNumber: string, url: string): Observable<any> {
    if (url.indexOf('fuiclonado.com.br') > -1) {
      return this.http.post<Observable<any>>('http://localhost:2100/verifyNumber', { phoneNumber });
    } else {
      return this.http.post<Observable<any>>(`${this.baseURL}verifyNumber`, { phoneNumber });
    }
  }

  public verificarCodigoUsuario(phoneNumber: string, code: string, url: string): Observable<any> {
    if (url.indexOf('fuiclonado.com.br') > -1) {
      return this.http.post<Observable<any>>('http://localhost:2100/checkCodeNumber', { phoneNumber, code });
    } else {
      return this.http.post<Observable<any>>(`${this.baseURL}checkCodeNumber`, { phoneNumber, code });
    }
  }

 
  public getAccessToken(code: string, googleClientId: string, googleClientSceret: string, googleRedirectUrl: string): Observable<any> {
    return this.http.post<Observable<any>>('https://accounts.google.com/o/oauth2/token', { code: code, client_id: googleClientId, client_secret: googleClientSceret, redirect_uri: googleRedirectUrl, grant_type: "authorization_code" })
  }



  public getContatosGoogle(url: string, tokenType: string, accessToken: string): Observable<any> {
    if (url.indexOf('fuiclonado.com.br') > -1) {
      return this.http.post<Observable<any>>('http://localhost:2100/obterContatos', { url, tokenType, accessToken });
    } else {
      return this.http.post<Observable<any>>(`${this.baseURL}obterContatos`, { url, tokenType, accessToken });
    }
  }


  public enviarMensagemParaWhatsapp(): Observable<any> {
    // if (url.indexOf('fuiclonado.com.br') > -1) {
    return this.http.post<Observable<any>>('http://localhost:2100/sendWhatsappMessage', {});
    // } else {
    //   return this.http.post<Observable<any>>('${baseURL}sendWhatsappMessage', { url, tokenType, accessToken });
    // }
  }

  public enviarMensagemSMS(phoneNumber: string, msg: string, url: string): Observable<any> {
    if (url.indexOf('fuiclonado.com.br') > -1) {
      return this.http.post<Observable<any>>('http://localhost:2100/sendSMSMessage', { phoneNumber, msg });
    } else {
      return this.http.post<Observable<any>>(`${this.baseURL}sendSMSMessage`, { phoneNumber, msg });
    }
  }

  public enviarMensagemSMSOnly(phoneNumber: string[], msg: string, url: string): Observable<any> {
    ;
    if (url.indexOf('fuiclonado.com.br') > -1) {
      return this.http.post<Observable<any>>('http://localhost:2100/sendSMSMessageOnly', { phoneNumber, msg });
    } else {
      return this.http.post<Observable<any>>(`${this.baseURL}sendSMSMessageOnly`, { phoneNumber, msg });
    }
  }

  public testarApi(numero: string, url: string): Observable<any> {
    if (url.indexOf('fuiclonado.com.br') > -1) {
      return this.http.get<Observable<any>>(`http://localhost:2100/numeroClonadoTeste/${numero}`);
    } else {
      return this.http.get<Observable<any>>(`${this.baseURL}numeroClonadoTeste/${numero}`);
    }
  }


  
}
