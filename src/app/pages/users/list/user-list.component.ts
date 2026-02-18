import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddUserComponent } from 'src/app/pages/users/add/add-user.component';
import { EditUserComponent } from 'src/app/pages/users/edit/edit-user.component';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
import { Page } from 'src/app/shared/models/page.model';
import { User, UserRole } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        TranslateModule,
        NgClass,
        PageHeaderComponent
    ]
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly defaultPageSize = 20;
  readonly fallbackProfileImage = 'assets/images/user.png';
  displayedColumns: string[] = ['dni', 'user', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();
  readonly profileImageBaseUrl = `${environment.API_URL}${environment.API_PREFIX}/images/user-profile/`;

  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    if (!this.paginator.pageSize) {
      this.paginator.pageSize = this.defaultPageSize;
    }

    this.paginator.page.subscribe(() => this.loadUsers());

    this.authService.getSession().subscribe({
      next: (session) => {
        if (!session) {
          this.toastr.error('No se pudo obtener la sesión del usuario.', 'Sesión inválida');
          return;
        }

        this.loadUsers();
      },
      error: () => {
        this.toastr.error('No se pudo obtener la sesión del usuario.', 'Sesión inválida');
      }
    });
  }

  loadUsers(): void {
    this.userService.GetUsers(this.paginator.pageIndex, this.paginator.pageSize).subscribe({
      next: (data: Page<User>) => {
        this.dataSource.data = data.content;
        this.paginator.length = data.totalElements;
      },
      error: () => {
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      autoFocus: false,
      width: 'min(740px, 96vw)',
      maxWidth: '96vw',
      panelClass: 'app-dialog-panel'
    });

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
      data: { ...userData },
      autoFocus: false,
      width: 'min(740px, 96vw)',
      maxWidth: '96vw',
      panelClass: 'app-dialog-panel'
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
    this.router.navigate(['/user/password']);
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

  getRoleClass(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'role-admin';
      case UserRole.SUPERVISOR:
        return 'role-supervisor';
      case UserRole.EMPLOYEE:
        return 'role-employee';
      default:
        return 'role-default';
    }
  }

  getRoleLabel(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'Administrador';
      case UserRole.SUPERVISOR:
        return 'Supervisor';
      case UserRole.EMPLOYEE:
        return 'Empleado';
      case UserRole.DRIVER:
        return 'Chofer';
      case UserRole.PASSENGER:
        return 'Pasajero';
      default:
        return role;
    }
  }

  getProfileImageUrl(user: User): string {
    if (!user.profileImage?.filename) {
      return this.fallbackProfileImage;
    }

    return `${this.profileImageBaseUrl}${user.profileImage.filename}`;
  }

  useFallbackProfileImage(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.src = this.fallbackProfileImage;
  }

  getPageSubtitle(): string {
    return `${this.dataSource.data.length} usuarios visibles de ${this.paginator?.length || 0} totales`;
  }
}
