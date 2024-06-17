import { NgModule } from "@angular/core";

import { AddUserComponent } from "src/app/pages/users/add/add-user.component";
import { EditMyUserComponent } from "src/app/pages/users/edit-my-user/edit-my-user.component";
import { EditUserComponent } from "src/app/pages/users/edit/edit-user.component";
import { UserListComponent } from "src/app/pages/users/list/user-list.component";

import { SharedModule } from "../../shared/modules/shared.module";

@NgModule({
    imports: [
        SharedModule,
        UserListComponent,
        AddUserComponent,
        EditUserComponent,
        EditMyUserComponent
    ]
})
export class UserModule { }