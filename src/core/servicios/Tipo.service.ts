import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TIPO } from '../../shared/entidades/TIPO';

@Injectable({
  providedIn: 'root'
})
export class TIPOService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}TipoFestivo/`;
  }

  public ObtenerTodos(): Observable<TIPO[]> {
    return this.http.get<TIPO[]>(`${this.url}ObtenerTodos`);
  }

  public ObtenerPorId(Id: number): Observable<TIPO[]> {
    return this.http.get<TIPO[]>(`${this.url}ObtenerPorId/${Id}`);
  }

  public Agregar(TIPO: TIPO): Observable<TIPO> {
    return this.http.post<TIPO>(`${this.url}Agregar`, TIPO);
  }

  public Actualizar(TIPO: TIPO): Observable<TIPO> {
    return this.http.put<TIPO>(`${this.url}Actualizar`, TIPO);
  }

  public Eliminar(Id: Number): Observable<TIPO> {
    return this.http.delete<TIPO>(`${this.url}Eliminar/${Id}`);
  }

  public Buscar(Dato: string): Observable<TIPO> {
    return this.http.get<TIPO>(`${this.url}Buscar/${Dato}`);
  }
  


}
