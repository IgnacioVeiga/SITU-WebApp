import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Incidencia } from 'src/app/models/interfaces';


/** Constante usada para rellenar la columna de importancia. */
const NivelDeImportancia: string[] = [
  'Extrema', 'Alta', 'Media', 'Baja', 'Ligera'
];

@Component({
  selector: 'app-lista-denuncias',
  templateUrl: './lista-denuncias.component.html'
})
export class ListaDenunciasComponent implements OnInit {
  columnasMostradas: string[] = ['codigo', 'descripcion', 'linea', 'interno', 'importancia'];
  dataSource: MatTableDataSource<Incidencia>;

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
    // Crea 100 incidencias
    const incidencias = Array.from({ length: 100 }, (_) => crearNuevaIncidencia());

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(incidencias);
    
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.paginator._intl.itemsPerPageLabel = 'Cantidad de filas';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function crearNuevaIncidencia(): Incidencia {
  const codigo = '#' + generadorDeId(6);

  return {
    codigo,
    descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit parturient velit phasellus fermentum vitae congue',
    linea: Math.round(Math.floor(Math.random() * 500) + 100) + '',
    interno: Math.round(Math.floor(Math.random() * 3399) + 1700),
    importancia: NivelDeImportancia[Math.round(Math.random() * (NivelDeImportancia.length - 1))]
  };
}

function generadorDeId(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.toUpperCase();
}
