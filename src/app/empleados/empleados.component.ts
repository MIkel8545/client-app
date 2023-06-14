import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleados.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
 
})
export class EmpleadosComponent implements OnInit{

  empleados: Empleado[] = [];

  constructor( private empleadoService: EmpleadoService, private router: Router) {
   
   
  
  }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(
      empleados => this.empleados = empleados
      );
   
  }

  openEmpl(empleado: Empleado): void {

    this.router.navigate(['/empleados/form',empleado.id]);
}

  deleteEmpl(empleado: Empleado): void{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estás seguro ?',
      text: `Ésta seguro de eliminar al empleado ${empleado.nombre} ${empleado.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.empleadoService.delete(empleado.id).subscribe(

          response =>{
            this.empleados = this.empleados.filter(emp => emp !== empleado )
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'El empleado se ha eliminado',
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
          'El empleado no se ha eliminado',
          'error'
        )
      }
    })


  }


}
