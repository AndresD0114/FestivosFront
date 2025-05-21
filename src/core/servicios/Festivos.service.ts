import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FESTIVO } from '../../shared/entidades/FESTIVO';
import { FestivoEditarDTO } from '../../shared/DTO/FestivosEditarDTO';
import { FestivoDTO } from '../../shared/DTO/FestivoDTO.dto';


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
  public Validar(fecha: string): Observable<string> {
  return this.http.get(`${this.url}Validar/${fecha}`, { responseType: 'text' });
}
public ObtenerPorAnio(anio: number): Observable<FestivoDTO[]> {
  return this.http.get<FestivoDTO[]>(`${this.url}listar/${anio}`);
}
}




