import {Component} from '@angular/core';
import videojs from 'video.js';

@Component({
    selector : 'app-home',
    templateUrl : 'home.page.html',
    styleUrls : ['home.page.scss'],
})
export class HomePage {

    constructor() {
    }

    player: videojs.Player;

    onPlayerReady(player: videojs.Player) {
        this.player = player;
        console.log(player);
    }

}
