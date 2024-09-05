import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { InicioComponent } from './shared/inicio/inicio.component';
import { SobrenosotrosComponent } from './shared/sobrenosotros/sobrenosotros.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EmailFormComponent } from './email-form.component/email-form.component.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,InicioComponent,SobrenosotrosComponent,FooterComponent,EmailFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AsesoriaAngular';
}
