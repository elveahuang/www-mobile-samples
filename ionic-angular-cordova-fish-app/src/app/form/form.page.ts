import { Component } from '@angular/core';
import Prescription from '../commons/types/prescription';
import { createPrescription } from '../commons/utils';

@Component({
    selector: 'app-page-form',
    templateUrl: 'form.page.html',
    styleUrls: ['form.page.scss'],
})
export class FormPage {
    entity: Prescription = createPrescription();
}
