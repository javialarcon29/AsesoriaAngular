import { Routes } from '@angular/router';
import { InicioComponent } from './shared/inicio/inicio.component';
import { ServiciosComponent } from './shared/servicios/servicios.component';
import { SobrenosotrosComponent } from './shared/sobrenosotros/sobrenosotros.component';
import { EmailFormComponent } from './email-form.component/email-form.component.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
  { path: '', component: InicioComponent },  // Ruta predeterminada
  { path: 'Servicios', component: ServiciosComponent },
  { path: 'Inicio', component: InicioComponent },
  { path: 'SobreNosotros', component: SobrenosotrosComponent },
  { path: 'Contacto', component: EmailFormComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Registro', component: RegisterComponent },
];

