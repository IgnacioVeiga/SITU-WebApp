import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddUserComponent } from 'src/app/pages/users/add/add-user.component';
import { EditUserComponent } from 'src/app/pages/users/edit/edit-user.component';
import { Page } from 'src/app/shared/models/page.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UpdatePasswordComponent } from '../../auth/update-password/update-password.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    TranslateModule
  ]
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['dni', 'firstname', 'lastname', 'photo', 'role', 'actions'];
  dataSource: any = new MatTableDataSource<User>;

  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);
  private userService = inject(UserService);

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
        // TODO: review, organize and translate all these types of toastr messages.
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
            this.loadUsers();
          },
          error: () => {
            // TODO: review, organize and translate all these types of toastr messages.
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
        // If “save” was clicked in the dialog, it updates the data in the database.
        this.userService.EditUser(result).subscribe({
          next: () => {
            this.loadUsers();
          },
          error: () => {
            // TODO: review, organize and translate all these types of toastr messages.
            this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
          }
        });
      }
    });
  }

  updatePassword(): void {
    const dialogRef = this.dialog.open(UpdatePasswordComponent);
    dialogRef.afterClosed().subscribe(() => { });
  }

  deleteUser(id: number): void {
    this.userService.RemoveUser(id).subscribe({
      next: (): void => {
        this.loadUsers();
      },
      error: () => {
        // TODO: review, organize and translate all these types of toastr messages.
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });
  }
}