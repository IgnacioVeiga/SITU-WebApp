import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddUserComponent } from 'src/app/pages/users/add/add-user.component';
import { EditMyUserComponent } from 'src/app/pages/users/edit-my-user/edit-my-user.component';
import { EditUserComponent } from 'src/app/pages/users/edit/edit-user.component';
import { Page } from 'src/app/shared/models/page.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['dni', 'firstname', 'lastname', 'photo', 'role', 'actions'];
  dataSource: any = new MatTableDataSource<User>;

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
    // TODO: traer el id de la empresa del usuario logeado
    const BUS_COMPANY_ID = 1;

    this.userService.GetUsers(this.paginator.pageIndex, this.paginator.pageSize, BUS_COMPANY_ID).subscribe({
      next: (data: Page<User>) => {
        this.dataSource.data = data.content;
      },
      error: () => {
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se hizo clic en guardar en el diálogo, actualiza los datos en la base de datos
        this.userService.CreateUser(result).subscribe({
          next: () => {
            this.toastr.success('Usuario añadido!');
            //Refresca la tabla
            this.loadUsers();
          },
          error: () => {
            this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
          }
        });
      }
    });
  }

  editUser(userData: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { ...userData }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si se hizo clic en guardar en el diálogo, actualiza los datos en la base de datos
        this.userService.EditUser(result).subscribe({
          next: () => {
            this.toastr.success('Usuario modificado!');
            //Refresca la tabla
            this.loadUsers();
          },
          error: () => {
            this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
          }
        });
      }
    });
  }

  editMyUser(): void {
    const dialogRef = this.dialog.open(EditMyUserComponent);

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.toastr.success('Tu usuario fue modificado!');
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.RemoveUser(id).subscribe({
      next: (): void => {
        this.toastr.success('El usuario ya no pertece a la empresa.');
        //Refresca la tabla
        this.loadUsers();
      },
      error: () => {
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });
  }
}