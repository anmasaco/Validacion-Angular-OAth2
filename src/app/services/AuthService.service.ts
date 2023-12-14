import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
/*
  private apiUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  async login(name: string, password: string): Promise<boolean> {
    const captchaResponse = "afklasfkaf23412";
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('client_id'); // Aquí es donde corregí
console.log(clientId);
    const body = new HttpParams()
      .set('name', name+"|"+clientId)
      .set('password', password)
      .set('client_id', clientId!); // Asumiendo que clientId no es nulo. Si podría serlo, necesitas manejar ese caso

      console.log("soy CLientid: "+clientId);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

      try {
        console.log("body", body.toString());
  
        // Incluye el client_id en la URL de la solicitud POST
        const loginUrlWithClientId = `${this.apiUrl}/login`;
        
        const response = await lastValueFrom(this.http.post<string>(
          loginUrlWithClientId,
          body.toString(),
          {
            headers: headers,
            responseType: 'text' as 'json'
          }
        ));
  
        if (response) {
          console.log("response: ", response);
          localStorage.setItem('token', response);
          return true;
        }
  
        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
  }
*/
}


export function initializeAuth(oauthService: OAuthService): () => Promise<void> {
  return async () => {
    const authConfig = new AuthConfig({
      issuer: 'http://localhost:9000', // tu URL del servidor de autorización
      redirectUri: 'http://127.0.0.1:4300/home',
      clientId: 'L0g1n4ppCl13nt1D',
      responseType: 'code',
      scope: 'openid', // scopes que necesites
    });
    
    oauthService.configure(authConfig);
    await oauthService.loadDiscoveryDocument();
  };
  
}
  