import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { SharedModule } from '../shared/alert/shared.module';

@NgModule({
    declarations:[
        AuthComponent,
    ],
    imports:[
      CommonModule,
      FormsModule,
      RouterModule.forChild([
        { path: '', component: AuthComponent },//tek bir tane olduğu için birden fazla olsaydı onun içinde routing module oluşturman gerekirdi.

      ]),
      SharedModule
    ],
    exports:[
        AuthComponent,
    ]

})
export class AuthModule{

}