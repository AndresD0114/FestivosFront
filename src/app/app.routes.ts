import { Routes } from '@angular/router';
import { TipoFestivoComponent } from '../features/componentes/tipo-festivo/tipo-festivo.component';
import { FestivosComponent } from '../features/componentes/festivos/festivos.component';

export const routes: Routes = [
    { path: "tipos", component:TipoFestivoComponent },
    {path: "festivos", component:FestivosComponent}
];
