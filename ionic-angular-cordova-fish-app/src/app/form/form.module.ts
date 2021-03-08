import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormPage } from './form.page';
import { FormPageRoutingModule } from './form-routing.module';

@NgModule({
    imports: [IonicModule, CommonModule, FormsModule, FormPageRoutingModule],
    declarations: [FormPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormPageModule {}
