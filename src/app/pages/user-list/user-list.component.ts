import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserComponent } from 'src/app/dialogs/add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit {
  displayedColumns: string[] = ['number', 'firstname', 'lastname', 'photo', 'role'];
  dataSource: any = new MatTableDataSource<UserElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export interface UserElement {
  number: number;
  firstname: string;
  lastname: string;
  photo: string;
  role: string;
}

const ELEMENT_DATA: UserElement[] = [
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { number: 0, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
];