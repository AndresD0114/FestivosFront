import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FESTIVO } from '../../shared/entidades/FESTIVO';
import { FestivoEditarDTO } from '../../shared/DTO/FestivosEditarDTO';


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

  public Agregar(festivo: FestivoEditarDTO): Observable<FESTIVO> {
  return this.http.post<FESTIVO>(`${this.url}Agregar`, festivo);
}


  public Actualizar(FESTIVO: FESTIVO): Observable<FESTIVO> {
    return this.http.put<FESTIVO>(`${this.url}Actualizar`, FESTIVO);
  }

  public Eliminar(Id: Number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.url}Eliminar/${Id}`);
  }

  public Buscar(Opcion: number,Dato: string): Observable<FESTIVO[]> {
    return this.http.get<FESTIVO[]>(`${this.url}Buscar/${Opcion}/${Dato}`);
  }
  public Validar(Dia: number, Mes: number, Anio: number): Observable<FESTIVO> {
    return this.http.get<FESTIVO>(`${this.url}Validar/${Dia}/${Mes}/${Anio}`);
  }


}
