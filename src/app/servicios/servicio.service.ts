import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Cliente } from '../clientes/cliente';
import { Servicio } from './servicio';
import { Empleado } from '../empleados/empleado';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private urlCliente:string = 'http://localhost:8080/api/clientes';
  private urlEmpleado:string = 'http://localhost:8080/api/empleados';
  private urlEndPoint:string = 'http://localhost:8080/api/servicios';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor( private http: HttpClient, private router: Router) { }


//Obtener la lista de todos los clientes
  getClientes(): Observable <Cliente[]>{
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlCliente);
  }

  //Obtener la lista de todos los empleados
  getEmpleados(): Observable <Empleado[]>{
    //return of(CLIENTES);
    return this.http.get<Empleado[]>(this.urlEmpleado);
  }
//Obtener la lista de todos los Servicios
  getServicios(): Observable <Servicio[]>{
    //return of(CLIENTES);
    return this.http.get<Servicio[]>(this.urlEndPoint);
  }

//Crear servicio
  create(servicio: Servicio): Observable<any>{

    return this.http.post<any>(this.urlEndPoint, servicio, {headers: this.httpHeaders}).pipe(
  catchError(e =>{
    Swal.fire(e.error.mensaje,e.error.error, 'error');
    return throwError(e);
  })
    );
  }
//Obtener datos de un Servicio
  getServicio(id: Number): Observable<Servicio>{
    return this.http.get<Servicio>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/servicios']);
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //Actualizar Servicio
  update(servicio: Servicio): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${servicio.id}`,servicio, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //Eliminar Servicio
  delete(id: Number | undefined): Observable<Servicio>{
    return this.http.delete<Servicio>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
