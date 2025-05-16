import { Component, Inject } from '@angular/core';
import { FESTIVO } from '../../../shared/entidades/FESTIVO';
import { TIPO } from '../../../shared/entidades/TIPO';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FestivoEditarDTO } from '../../../shared/DTO/FestivosEditarDTO';

export interface DatosEdicionFestivo {
  encabezado: string;
  festivo: FestivoEditarDTO;
  tipos: TIPO[];
}

@Component({
  selector: 'app-festivos-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './festivos-editar.component.html',
  styleUrl: './festivos-editar.component.css'
})
export class FestivosEditarComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionFestivo,
    private referenciaDialogo: MatDialogRef<FestivosEditarComponent>,) {

  }

  public cerrar() {
    this.referenciaDialogo.close();
  }
}
