import { Component, OnInit } from '@angular/core';
import { Servicio } from './servicio';
import { ServicioService } from './servicio.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Cliente } from '../clientes/cliente';
import { Empleado } from '../empleados/empleado';

@Component({
  selector: 'app-clientes',
  templateUrl: './servicios.component.html',
 
})
export class ServiciosComponent implements OnInit{

  clientes: Cliente[] = [];
  servicios: Servicio[] = [];
  empleados: Empleado[] = [];

  constructor( private servicioService: ServicioService, private router:Router) {
   
   
  
  }

  ngOnInit(): void {
    this.servicioService.getClientes().subscribe(
      clientes => this.clientes = clientes
      );
      this.servicioService.getServicios().subscribe(
        servicios => this.servicios = servicios
        );
        this.servicioService.getEmpleados().subscribe(
          empleados => this.empleados = empleados
          );
   
  }

  openService(servicio: Servicio): void {

      this.router.navigate(['/servicios/form',servicio.id]);
  }

  delete(servicio: Servicio): void{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary me-2',
        cancelButton: 'btn btn-danger '
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estás seguro ?',
      text: `Ésta seguro de eliminar el servicio ${servicio.marca} ${servicio.placas}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicioService.delete(servicio.id).subscribe(

          response =>{
            this.servicios = this.servicios.filter(ser => ser !== servicio )
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'El cliente se ha eliminado',
              'success'
            )
          }
        )
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El cliente no se ha eliminado',
          'error'
        )
      }
    })


  }


}
