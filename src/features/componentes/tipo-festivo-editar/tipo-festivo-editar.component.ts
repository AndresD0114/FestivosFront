import { Component, Inject } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TIPO } from '../../../shared/entidades/TIPO';

export interface DatosEdicionTipo {
encabezado: string;
tipo: TIPO;
}
@Component({
  selector: 'app-tipo-festivo-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule
    
  ],
  templateUrl: './tipo-festivo-editar.component.html',
  styleUrl: './tipo-festivo-editar.component.css'
})
export class TipoFestivoEditarComponent {
constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionTipo,
    private dialogRef: MatDialogRef<TipoFestivoEditarComponent>) {

     }
      public cerrar() {
    this.dialogRef.close();
  }
}

