import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleados.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './formEmpleado.component.html',

})
export class FormEmpleadoComponent implements OnInit {

  public empleado: Empleado = new Empleado();
  public titulo:string = "Crear Empleado";

  constructor( 
    private empleadoService: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){}
  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if(id){
        this.empleadoService.getEmpleado(id).subscribe( (empleado) =>  this.empleado = empleado)
      }
    })
  }

  public create(): void{
    
    this.empleadoService.create(this.empleado).subscribe(
      json => {
              this.router.navigate(['/empleados'])
              Swal.fire('Nuevo Empleado', `${json.mensaje}:  ${json.empleado.nombre}`, 'success')
      } 
    )
  }

  public update(): void {
    this.empleadoService.update(this.empleado).subscribe(
      json => {
        this.router.navigate(['/empleados'])
        Swal.fire('Empleado Actualizado', `${json.mensaje}:  ${json.empleado.nombre}`, 'success')
      }
    )
  }



}
 