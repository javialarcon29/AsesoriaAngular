import { Component } from '@angular/core';
import { EmailService } from '../email.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; // Importa SweetAlert2

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './email-form.component.component.html',
  styleUrls: ['./email-form.component.component.css']
})
export class EmailFormComponent {
  to = '';
  subject = '';
  phone = '';  // Campo de teléfono añadido
  text = 'Tenemos sus datos, pronto le atenderemos ';

  constructor(private emailService: EmailService) { }

  sendEmail() {
    console.log(this.phone);  // Imprimir el número de teléfono en la consola del frontend

    const emailData = {
      to: this.to,
      subject: this.subject,
      phone: this.phone,
      text: this.text,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4a4a4a;">Nuevo mensaje de contacto</h2>
            <p><strong>De:</strong> ${this.to}</p>
            <p><strong>Teléfono:</strong> ${this.phone}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="background-color: #f8f8f8; padding: 15px; border-radius: 5px;">${this.text}</p>
          </body>
        </html>
      `
    };

    this.emailService.sendEmail(emailData).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        Swal.fire({
          icon: 'success',
          title: '¡Correo enviado con éxito!',
          text: 'Se ha recogito correctamente sus datos',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
      },
      error => {
        console.error('Error completo:', error);
        console.error('Mensaje de error:', error.message);
        console.error('Cuerpo de la respuesta:', error.error);
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar correo',
          text: 'Hubo un problema al intentar enviar tu mensaje. Por favor, inténtalo de nuevo.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
}

