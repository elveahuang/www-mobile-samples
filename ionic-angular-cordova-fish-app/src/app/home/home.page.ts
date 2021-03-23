import { Component } from '@angular/core';
import Prescription from '../commons/types/prescription';
import { PrescriptionService } from '../commons/service/prescription.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-page-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    list: Prescription[];

    constructor(
        private service: PrescriptionService,
        private router: Router,
        private alertController: AlertController,
    ) {
        this.service.getPrescriptionList().then((list: Prescription[]) => {
            this.list = list;
        });
    }

    async deletePrescription(uuid: string): Promise<void> {
        const alert = await this.alertController.create({
            message: '确定删除该配方吗？删除后将无法恢复！',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel: blah');
                    },
                },
                {
                    text: '确定',
                    handler: () => {
                        this.service.deletePrescription(uuid).then(() => {
                            this.service.getPrescriptionList().then((list: Prescription[]) => {
                                this.list = list;
                            });
                        });
                    },
                },
            ],
        });

        await alert.present();
    }

    editPrescription(uuid: string): void {
        this.router
            .navigate(['/form'], {
                queryParams: { uuid: uuid },
            })
            .then();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    doRefresh(event: any): void {
        console.log(event);
        this.service.getPrescriptionList().then((list: Prescription[]) => {
            this.list = list;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            event.target.complete();
        });
    }

    ionViewDidEnter(): void {
        this.service.getPrescriptionList().then((list: Prescription[]) => {
            this.list = list;
        });
    }
}
