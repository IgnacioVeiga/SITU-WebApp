import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddUserComponent } from 'src/app/dialogs/add-user/add-user.component';
import { EditMyUserComponent } from 'src/app/dialogs/edit-my-user/edit-my-user.component';
import { EditUserComponent } from 'src/app/dialogs/edit-user/edit-user.component';
import { ERole } from 'src/app/models/enums';
import { UserModel } from 'src/app/models/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['dni', 'firstname', 'lastname', 'photo', 'role', 'actions'];
  dataSource: any = new MatTableDataSource<UserModel>;

  selectedUser: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private toastr: ToastrService) {
    this.dataSource.data = ELEMENT_DATA;
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success('Usuario añadido!');
      }
    });
  }

  editUser(user: UserModel) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success('Usuario modificado!');
        console.log(result);
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

const ELEMENT_DATA: UserModel[] = [
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: ERole.Driver }
];