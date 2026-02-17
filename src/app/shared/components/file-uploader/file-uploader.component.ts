import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrl: './file-uploader.component.scss',
    imports: [TranslateModule]
})
export class FileUploaderComponent {
    @Input() imgUrl: string = 'assets/images/user.png';
    @Input() userId: number | null = null;
    @Input() dni: number | null = null;
    @Output() uploaded = new EventEmitter<void>();

    selectedFile: File | null = null;
    processing: boolean = false;

    private readonly userService = inject(UserService);
    private readonly toastr = inject(ToastrService);

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.selectedFile = input.files?.[0] || null;

        if (!this.selectedFile) {
            return;
        }

        // Local preview to provide quick visual feedback before upload.
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
            this.imgUrl = String(loadEvent.target?.result || this.imgUrl);
        };
        reader.readAsDataURL(this.selectedFile);
    }

    upload(): void {
        if (!this.selectedFile) {
            this.toastr.warning('Seleccioná una imagen antes de subirla.');
            return;
        }

        if (!this.userId || !this.dni) {
            this.toastr.error('No se pudo identificar al usuario para subir la imagen.');
            return;
        }

        this.processing = true;

        this.userService.SetProfilePic(this.selectedFile, this.dni, this.userId).subscribe({
            next: () => {
                this.processing = false;
                this.uploaded.emit();
                this.toastr.success('Imagen de perfil actualizada correctamente.');
            },
            error: () => {
                this.processing = false;
                this.toastr.error('No se pudo subir la imagen de perfil.');
            }
        });
    }
}
