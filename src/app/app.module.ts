import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms'; 
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoService } from './empleados/empleados.service';
import { FormEmpleadoComponent } from './empleados/formEmpleado.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { FormServicioComponent } from './servicios/formServicio.component';
import { ServicioService } from './servicios/servicio.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    EmpleadosComponent,
    FormComponent,
    FormEmpleadoComponent,
    ServiciosComponent,
    FormServicioComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ClienteService, EmpleadoService, ServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
