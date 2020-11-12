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
        private utilService : UtilsService,
        private platform : Platform
    ) {
        this.initializeApp();
    }

    initializeApp() : void {
        this.platform.ready().then((readySource : string) => {
            console.log('Platform ready from', readySource);
            this.utilService.initializeApp().then(() => {
                console.log('Application initialize done.');
            });
        }).catch(() => {
            console.log('Platform ready');
        });
    }

}
