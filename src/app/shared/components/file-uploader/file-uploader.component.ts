import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'file-uploader',
    templateUrl: './file-uploader.component.html',
    standalone: true,
    imports: [NgIf]
})
export class FileUploaderComponent {
    @Input() imgUrl!: string;
    selectedFile: File | undefined;
    processing = false;

    constructor(private userService: UserService) { }

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
