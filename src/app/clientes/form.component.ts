import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo:string = "Cliente";
  private fotoSeleccionada: File;

  constructor( 
    private clienteService: ClienteService,
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
        this.clienteService.getCliente(id).subscribe( (cliente) =>  this.cliente = cliente)
      }
    })
  }

  public create(): void{

    this.clienteService.uploadPhoto(this.fotoSeleccionada, this.cliente.id).subscribe(
      (cliente =>{
        this.cliente = cliente;
      } )
    )


    this.clienteService.create(this.cliente).subscribe(
      json => {
              this.router.navigate(['/clientes'])
              Swal.fire('Nuevo Cliente', `${json.mensaje}:  ${json.cliente.nombre}`, 'success')
      } 
    )
  }

  public update(): void {

    this.clienteService.uploadPhoto(this.fotoSeleccionada, this.cliente.id).subscribe(
      (cliente =>{
        this.cliente = cliente;
      } )
    )

    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente Actualizado', `${json.mensaje}:  ${json.cliente.nombre}`, 'success')
      }
    )
  }

  uploadPhoto(event){

    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }



}
 