import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { UpdatePasswordComponent } from '../../auth/update-password/update-password.component';
import { AddUserComponent } from 'src/app/pages/users/add/add-user.component';
import { EditUserComponent } from 'src/app/pages/users/edit/edit-user.component';
import { Page } from 'src/app/shared/models/page.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

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
  dataSource = new MatTableDataSource<User>();

  private readonly dialog = inject(MatDialog);
  private readonly toastr = inject(ToastrService);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  private companyId: number | null = null;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.authService.getSession().subscribe({
      next: (session) => {
        if (!session) {
          this.toastr.error('No se pudo obtener la sesión del usuario.', 'Sesión inválida');
          return;
        }

        this.companyId = session.companyId;
        this.loadUsers();
      },
      error: () => {
        this.toastr.error('No se pudo obtener la sesión del usuario.', 'Sesión inválida');
      }
    });
  }

  loadUsers(): void {
    if (!this.companyId) {
      return;
    }

    this.userService.GetUsers(this.paginator.pageIndex, this.paginator.pageSize, this.companyId).subscribe({
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.CreateUser(result).subscribe({
          next: () => {
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
        this.userService.EditUser(result).subscribe({
          next: () => {
            this.loadUsers();
          },
          error: () => {
            this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
          }
        });
      }
    });
  }

  updatePassword(): void {
    const dialogRef = this.dialog.open(UpdatePasswordComponent);
    dialogRef.afterClosed().subscribe(() => {
      // no-op
    });
  }

  deleteUser(id: number): void {
    this.userService.RemoveUser(id).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: () => {
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });
  }
}
