import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddUserComponent } from 'src/app/pages/users/add/add-user.component';
import { EditMyUserComponent } from 'src/app/pages/users/edit-my-user/edit-my-user.component';
import { EditUserComponent } from 'src/app/pages/users/edit/edit-user.component';
import { UserModel } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['dni', 'firstname', 'lastname', 'photo', 'role', 'actions'];
  dataSource: any = new MatTableDataSource<UserModel>;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.GetUsers(this.paginator.pageIndex, this.paginator.pageSize).subscribe(
      (data: any): void => {
        this.dataSource.data = [...data];
      }
    );
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