import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
//
import {UtilsService} from '@commons/core/services/utils.service';

@Component({
    selector : 'app-root',
    templateUrl : 'app.component.html'
})
export class AppComponent {
    constructor(
        private utilService: UtilsService,
        private platform: Platform
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.utilService.initializeApp().then();
        });
    }
}
