import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { TIPO } from '../../../shared/entidades/TIPO';
import { TIPOService } from '../../../core/servicios/Tipo.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-tipo-festivo',
  imports: [
    ReferenciasMaterialModule,
    NgFor,
    FormsModule,
    NgxDatatableModule,

  ],
  templateUrl: './tipo-festivo.component.html',
  styleUrl: './tipo-festivo.component.css'
})
export class TipoFestivoComponent implements OnInit {
  
  @ViewChild(DatatableComponent) tabla!: DatatableComponent;

  public readonly TAMANO: number = 10;
  public opcionBusqueda: number = -1;
  public opcionesBusqueda: string[] = ["nombre"];
  public textoBusqueda: string = "";

  public Tipos: TIPO[] = [];
  public columnas = [
    { name: "tipo", prop: "nombre" }
    
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;
  public TipoEscogido: TIPO | undefined;
  public indiceTipoEscogido: number = -1;

  constructor(private servicioTipo: TIPOService,
    private servicioDialogo: MatDialog,
  ) {

  }



  ngOnInit(): void {
    this.listar(-1);
  }
  public listar(idBuscado: number) {
    this.servicioTipo.ObtenerTodos().subscribe({
      next: response => {
        this.Tipos= response;
        if (idBuscado > 0) {
          this.indiceTipoEscogido = this.Tipos.findIndex(Tipo => Tipo.id == idBuscado);
          this.TipoEscogido = this.Tipos[this.indiceTipoEscogido];
          setTimeout(() => {
            this.tabla.offset = Math.floor(this.indiceTipoEscogido / this.TAMANO);
          });

        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }
}
