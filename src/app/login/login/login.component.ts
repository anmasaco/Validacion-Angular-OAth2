import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  usuario = {
    user: '',
    password: ''
  };

  showRecaptcha: boolean = false;
  retry : number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (!window.opener) {
      this.openInPopup()
    }
  }

  openInPopup(){
    const width = 700;
    const height = 800;
    const left = 300;
    const top = 200;

    window.open(
      '/login',
      'LoginPopup',
      `width=${width},height=${height},left=${left},top=${top}`
    );

  }

  validate() {
    if (!this.usuario.user.trim() || !this.usuario.password.trim()) {
      alert('Por favor, introduce tu usuario y contraseña.');
      return;
    }
  
    const clientId = new URLSearchParams(window.location.search).get('client_id'); 
    if (!clientId) {
      alert('El client_id no está presente en la URL.');
      return;
    }
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = new URLSearchParams();
    body.set('name', this.usuario.user);
    body.set('password', this.usuario.password);
    body.set('client_id', clientId);
  
    this.http.post('http://localhost:9000/login', body.toString(), { headers: headers }).subscribe(
      (response: any) => {
        if (response.redirectUrl) {
          window.location.href = response.redirectUrl;
        } else {
          console.error('La respuesta no tiene un redirectUrl:', response);
        }
      },
      error => {
        this.retry += 1;
        console.log(this.retry);
        if(this.retry >= 1) {
        this.showCaptcha()
        }

        // Inspecciona el código de estado del error
        switch (error.status) {
  
          case 400: // Bad Request
            alert('Solicitud incorrecta. Por favor, verifica los datos enviados.');
            break;
          case 401: // Unauthorized
            alert('Usuario no autorizado.');
            break;
          case 403: // Forbidden
            alert('No tienes permisos para realizar esta operación.');
            break;
          case 500: // Internal Server Error
            alert('Ha ocurrido un error en el servidor. Inténtalo de nuevo más tarde.');
            break;
          default:
            alert('Ha ocurrido un error desconocido. Inténtalo de nuevo.');
            break;
        }
        console.error('Error al autenticar:', error);
      }
    );
  }

  showCaptcha(){
    this.showRecaptcha = true
  }
}
