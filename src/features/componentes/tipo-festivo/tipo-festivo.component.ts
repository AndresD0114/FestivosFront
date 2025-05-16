import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { TIPO } from '../../../shared/entidades/TIPO';
import { TIPOService } from '../../../core/servicios/Tipo.service';
import { MatDialog } from '@angular/material/dialog';
import { TipoFestivoEditarComponent } from '../tipo-festivo-editar/tipo-festivo-editar.component';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';



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
  { name: "tipo", prop: "tipoFestivo" }
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
  escoger(event: any) {
    if (event.type == "click") {
      this.TipoEscogido= event.row;
      this.indiceTipoEscogido = this.Tipos.findIndex(TIPO => TIPO == this.TipoEscogido);
    }
  }
  public listar(idBuscado: number) {
    this.servicioTipo.ObtenerTodos().subscribe({
      next: response => {
        this.Tipos= response;
        console.log(this.Tipos);
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
  public modificar() {
    if (this.TipoEscogido) {
      const dialogo = this.servicioDialogo.open(TipoFestivoEditarComponent, {
        width: "500px",
        height: "300px",
        data: {
          encabezado: `Modicando el tipo ${this.TipoEscogido.tipoFestivo}`,
          tipo: this.TipoEscogido
        },
        disableClose: true,
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.servicioTipo.Actualizar(datos.tipo).subscribe({
              next: response => {
                this.Tipos[this.indiceTipoEscogido] = response;
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Debe escoger el tipo a modificar");
    }
  }
  public verificarEliminar() {
    if (this.TipoEscogido) {
      const dialogo = this.servicioDialogo.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar el tipo ${this.TipoEscogido.tipoFestivo} ?`,
          id: this.TipoEscogido.id
        },
        disableClose: true,
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.servicioTipo.Eliminar(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.listar(-1);
                  window.alert("tipo eliminado con éxito");
                } else {
                  window.alert("No se pudo eliminar el tipo");
                }
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Debe escoger el tipo a eliminar");
    }
  }

  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.servicioTipo.Buscar(this.opcionBusqueda, this.textoBusqueda).subscribe(
        {
          next: response => {
            this.Tipos = response;
          },
          error: error => {
            window.alert(error.message);
          }
        }
      );
    }
    else {
      this.listar(-1);
    }
  }
 public agregar() {
    const dialogo = this.servicioDialogo.open(TipoFestivoEditarComponent, {
      width: "500px",
      height: "300px",
      data: {
        encabezado: "Agregando un nuevo tipo",
        tipo: {
          id: 0,
          tipoFestivo: "",
        }
      },
      disableClose: true,
    });
    dialogo.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.servicioTipo.Agregar(datos.tipo).subscribe({
            next: response => {
              this.listar(response.id);
            },
            error: error => {
              window.alert(error.message);
            }
          });
        

        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  
}
