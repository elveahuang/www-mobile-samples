import { Component } from '@angular/core';
import Prescription from '../commons/types/prescription';
import { PrescriptionService } from '../commons/service/prescription.service';

@Component({
    selector: 'app-page-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    list: Prescription[];

    constructor(private service: PrescriptionService) {
        service.getPrescriptionList().then((list: Prescription[]) => {
            this.list = list;
        });
    }
}
