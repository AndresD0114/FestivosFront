import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FESTIVO } from '../../shared/entidades/FESTIVO';

@Injectable({
  providedIn: 'root'
})
export class FESTIVOService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}festivos/`;
  }

  public ObtenerTodos(): Observable<FESTIVO[]> {
    return this.http.get<FESTIVO[]>(`${this.url}ObtenerTodos`);
  }

  public ObtenerPorId(Id: number): Observable<FESTIVO[]> {
    return this.http.get<FESTIVO[]>(`${this.url}ObtenerPorId/${Id}`);
  }

  public Agregar(FESTIVO: FESTIVO): Observable<FESTIVO> {
    return this.http.post<FESTIVO>(`${this.url}Agregar`, FESTIVO);
  }

  public Actualizar(FESTIVO: FESTIVO): Observable<FESTIVO> {
    return this.http.put<FESTIVO>(`${this.url}Actualizar`, FESTIVO);
  }

  public Eliminar(Id: Number): Observable<FESTIVO> {
    return this.http.delete<FESTIVO>(`${this.url}Eliminar/${Id}`);
  }

  public Buscar(Dato: string): Observable<FESTIVO> {
    return this.http.get<FESTIVO>(`${this.url}Buscar/${Dato}`);
  }
  public Validar(Dia: number, Mes: number, Anio: number): Observable<FESTIVO> {
    return this.http.get<FESTIVO>(`${this.url}Validar/${Dia}/${Mes}/${Anio}`);
  }


}
