import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes'
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor( private http: HttpClient, private router: Router) { }


//Obtener la lista de todos los clientes
  getClientes(): Observable <Cliente[]>{
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

//Crear cliente
  create(cliente: Cliente): Observable<any>{

    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
  catchError(e =>{
    Swal.fire(e.error.mensaje,e.error.error, 'error');
    return throwError(e);
  })
    );
  }
//Obtener datos de un cliente
  getCliente(id: Number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //Actualizar cliente
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //Eliminar Cliente
  delete(id: Number | undefined): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    );
  }


  uploadPhoto(archivo: File, id): Observable<Cliente>  {
    let formData = new FormData
    formData.append("archivo",archivo);
    formData.append("id", id);

    return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError(e =>{
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
