import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";

import { TruncatePipe } from "../pipes/truncate.pipe";
import { ToastrModule } from "ngx-toastr";
import { BusRoutesComponent } from "src/app/pages/bus-routes/bus-routes.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [
        NavbarComponent,
        BusRoutesComponent,
        TruncatePipe
    ],
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatIconModule,
        MatMenuModule,
        MatStepperModule,
        MatToolbarModule,

        BrowserModule,
        FormsModule,
        RouterModule,
        ToastrModule.forRoot({
          closeButton: true,
          progressBar: true
        })
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatStepperModule,
        MatTableModule,
        MatToolbarModule,

        CommonModule,
        FormsModule,
        ToastrModule,
        
        NavbarComponent,
        TruncatePipe
    ]
})
export class SharedModule { }