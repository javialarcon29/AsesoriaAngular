import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: any;
  password: any;

  // Inyecta el Router en el constructor
  constructor(private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    console.log(this.username);
    console.log(this.password);

    // Petición al servidor HTTP
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: this.username, password: this.password })
    })
    .then(response => {
      if (response.ok) {
        // Redirige a la página de login después de un registro exitoso
        this.router.navigate(['/Login']);
      } else {
        // Manejo de errores si el registro falla
        console.error("Error en el registro");
      }
    })
    .catch(error => {
      console.error("Error en la petición", error);
    });
  }
}



