import { TIPO } from "./TIPO";

export interface FESTIVO
 {
    id: number,
    nombre: string,
    dia: number,
    mes: number,
    diaspascua: number,
    idTipo: number,
    tipo: TIPO,
  }