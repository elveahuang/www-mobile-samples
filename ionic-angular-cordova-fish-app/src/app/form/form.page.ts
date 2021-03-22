import { Component } from '@angular/core';
import Prescription from '../commons/types/prescription';
import { PrescriptionService } from '../commons/service/prescription.service';

@Component({
    selector: 'app-page-form',
    templateUrl: 'form.page.html',
    styleUrls: ['form.page.scss'],
})
export class FormPage {
    entity: Prescription;

    constructor(private service: PrescriptionService) {
        this.entity = service.calcPrescription(service.createPrescription());
    }

    public inputChange(): void {
        this.service.calcPrescription(this.entity);
        console.log(this.entity);
    }

    public save(): void {
        this.service.savePrescription(this.entity).then(() => {
            console.log('...');
        });
    }
}
