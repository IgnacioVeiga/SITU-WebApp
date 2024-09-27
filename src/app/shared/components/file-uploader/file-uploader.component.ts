import { Component, Input, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'file-uploader',
    templateUrl: './file-uploader.component.html',
    standalone: true,
    imports: [
        TranslateModule
    ]
})
export class FileUploaderComponent {
    @Input() imgUrl!: string;
    selectedFile: File | undefined;
    processing = false;

    private userService = inject(UserService);
    
    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    upload() {
        if (this.selectedFile) {
            this.processing = true;
            // TODO: get real data
            let dni = 0, userId = 0;
            this.userService.SetProfilePic(this.selectedFile, dni, userId).subscribe({
                next: (response: any) => {
                    if (response) {
                        this.imgUrl = response.url.toString();
                    }
                    this.processing = false
                },
                error: (err) => {
                    console.error(err);
                    this.processing = false
                }
            });
        }
    }
}
