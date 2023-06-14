import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
 
})
export class ClientesComponent implements OnInit{

  clientes: Cliente[] = [];

  constructor( private clienteService: ClienteService, private router:Router) {
  
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
      );
  }

  openClient(cliente: Cliente): void {

      this.router.navigate(['/clientes/form',cliente.id]);
  }

  delete(cliente: Cliente): void{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary me-2',
        cancelButton: 'btn btn-danger '
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estás seguro ?',
      text: `Ésta seguro de eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(

          response =>{
            this.clientes = this.clientes.filter(cli => cli !== cliente )
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
