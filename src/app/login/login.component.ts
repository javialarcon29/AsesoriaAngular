import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: any;
  password: any;

  constructor(private router: Router) { }

  onSubmit(event: Event) {
    event.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: this.username, password: this.password })
    })



    .then(response => {
      if (response.ok) {
        // Si las credenciales son correctas, redirigir a la página de inicio
        this.router.navigate(['/Inicio']);
      } else if (response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
          text: 'Por favor, verifica tu usuario y contraseña.',
          confirmButtonText: 'Aceptar'
        });
      } else if (response.status === 404) {
        Swal.fire({
          icon: 'warning',
          title: 'Usuario no encontrado',
          text: 'El usuario ingresado no existe en la base de datos.',
          confirmButtonText: 'Aceptar'
        });
      }
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error en la solicitud',
        text: 'Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo más tarde.',
        confirmButtonText: 'Aceptar'
      });
      console.log("Error en la solicitud:", error);
    });
  }
}
