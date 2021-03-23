import { Component } from '@angular/core';
import Prescription from '../commons/types/prescription';
import { PrescriptionService } from '../commons/service/prescription.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isEmpty } from 'lodash';

@Component({
    selector: 'app-page-form',
    templateUrl: 'form.page.html',
    styleUrls: ['form.page.scss'],
})
export class FormPage {
    uuid: string;
    entity: Prescription;

    constructor(private service: PrescriptionService, private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe((params: Params) => {
            this.uuid = params.uuid;
            this.service.getPrescription(this.uuid).then((p) => {
                if (isEmpty(p)) {
                    this.entity = service.calcPrescription(service.createPrescription());
                } else {
                    this.entity = p;
                }
            });
        });
        this.entity = service.calcPrescription(service.createPrescription());
    }

    public inputChange(): void {
        this.service.calcPrescription(this.entity);
        console.log(this.entity);
    }

    public save(): void {
        this.service.savePrescription(this.entity).then(() => {
            this.router.navigateByUrl('/').then();
        });
    }
}
