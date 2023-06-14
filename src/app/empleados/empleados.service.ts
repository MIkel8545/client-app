import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint:string = 'http://localhost:8080/api/empleados'
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor( private http: HttpClient, private router: Router) { }


//Obtener la lista de todos los clientes
  getEmpleados(): Observable <Empleado[]>{
    //return of(CLIENTES);
    return this.http.get<Empleado[]>(this.urlEndPoint);
  }

//Crear cliente
  create(empleado: Empleado): Observable<any>{

    return this.http.post<any>(this.urlEndPoint, empleado, {headers: this.httpHeaders}).pipe(
  catchError(e =>{
    Swal.fire(e.error.mensaje,e.error.error, 'error');
    return throwError(e);
  })
    );
  }
//Obtener datos de un cliente
  getEmpleado(id: Number): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/empleados']);
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //Actualizar cliente
  update(empleado: Empleado): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${empleado.id}`,empleado, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //Eliminar Cliente
  delete(id: Number | undefined): Observable<Empleado>{
    return this.http.delete<Empleado>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
