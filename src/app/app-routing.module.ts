import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { FormEmpleadoComponent } from './empleados/formEmpleado.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { FormServicioComponent } from './servicios/formServicio.component';

const routes: Routes = [
  {path: '', redirectTo: '/clientes',pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'empleados/form', component: FormEmpleadoComponent},
  {path: 'empleados/form/:id', component: FormEmpleadoComponent},
  {path: 'servicios', component: ServiciosComponent},
  {path: 'servicios/form', component: FormServicioComponent},
  {path: 'servicios/form/:id', component: FormServicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
