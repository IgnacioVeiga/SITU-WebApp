import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddUserComponent } from 'src/app/dialogs/add-user/add-user.component';
import { EditMyUserComponent } from 'src/app/dialogs/edit-my-user/edit-my-user.component';
import { EditUserComponent } from 'src/app/dialogs/edit-user/edit-user.component';
import { UserElement } from 'src/app/models/interfaces';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit {
  displayedColumns: string[] = ['dni', 'firstname', 'lastname', 'photo', 'role', 'actions'];
  dataSource: any = new MatTableDataSource<UserElement>(ELEMENT_DATA);

  selectedUser: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private toastr: ToastrService) { }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success('Usuario añadido!');
      }
    });
  }

  editUser(dni: number) {
    const dialogRef = this.dialog.open(EditUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success(dni + ' modificado!');
      }
    });
  }

  editMyUser() {
    const dialogRef = this.dialog.open(EditMyUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success('Tu usuario fue modificado!');
      }
    });
  }

  deleteUser(dni: number) {
    this.toastr.success(dni + ' ya no pertece a la empresa.');
  }
}

const ELEMENT_DATA: UserElement[] = [
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: 'Chofer' },
];