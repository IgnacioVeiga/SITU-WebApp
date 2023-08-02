import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AddUserComponent } from 'src/app/pages/users/add/add-user.component';
import { EditMyUserComponent } from 'src/app/pages/users/edit-my-user/edit-my-user.component';
import { EditUserComponent } from 'src/app/pages/users/edit/edit-user.component';
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
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>;
  userList: UserModel[] = [...LIST_DEMO];

  selectedUser: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.api.GET(`listUsers/${this.paginator.pageIndex}/${this.paginator.pageSize}`)
      .subscribe({
        next(resp) {
          // this.userList = resp;
        },
        error(err) {
          console.error('Error:', err);
        }
      });
  }

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private api: ApiService
  ) {
    this.dataSource.data = this.userList;
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

const LIST_DEMO: UserModel[] = [
  { dni: 12345678, firstname: 'Natalia', lastname: 'Natalia', photo: 'No disponible', role: ERole.Driver }
];