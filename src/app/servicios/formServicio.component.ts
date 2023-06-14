import { Component, OnInit } from '@angular/core';
import { Servicio } from './servicio';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { ServicioService } from './servicio.service';
import { Cliente } from '../clientes/cliente';
import { Empleado } from '../empleados/empleado';

@Component({
  selector: 'app-form',
  templateUrl: './formServicio.component.html',

})
export class FormServicioComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  clientes: Cliente[] = [];
  empleados: Empleado[] = [];
  public servicio: Servicio = new Servicio();
  public titulo:string = "Servicio";

  constructor( 
    private servicioService: ServicioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){}
  ngOnInit(): void {
    this.cargarServicio();
    this.servicioService.getClientes().subscribe(
      clientes => this.clientes = clientes
      );
      this.servicioService.getEmpleados().subscribe(
        empleados => this.empleados = empleados
        );
  }

  public cargarServicio(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if(id){
        this.servicioService.getServicio(id).subscribe( (servicio) =>  this.servicio = servicio)
      }
    })
  }

  public create(): void{
    
    this.servicioService.create(this.servicio).subscribe(
      json => {
              this.router.navigate(['/servicios'])
              Swal.fire('Nuevo Servicio', `${json.mensaje}:  ${json.servicio.marca}`, 'success')
      } 
    )
  }

  public update(): void {
    this.servicioService.update(this.servicio).subscribe(
      json => {
        this.router.navigate(['/servicios'])
        Swal.fire('Servicio Actualizado', `${json.mensaje}:  ${json.servicio.marcas}`, 'success')
      }
    )
  }



}
 