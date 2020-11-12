import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import videojs, {VideoJsPlayer} from 'video.js';

@Component({
    selector : 'app-video-player',
    templateUrl : './video-player.component.html',
    styleUrls : ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('targetElement', {static : false})
    public targetElement : ElementRef;

    @Input()
    options : {
        fluid : boolean,
        aspectRatio : string,
        autoplay : boolean,
        sources : {
            src : string,
            type : string,
        }[],
    };

    /**
     * 删除问题
     */
    @Output()
    playerReady : EventEmitter<videojs.Player> = new EventEmitter<VideoJsPlayer>();

    player : videojs.Player;

    constructor(public elementRef : ElementRef) {
    }

    ngOnDestroy() : void {
        if (this.player) {
            this.player.dispose();
        }
    }

    ngOnInit() : void {
        console.log('ngOnInit');
    }

    ngAfterViewInit() : void {
        console.log('ngAfterViewInit');
        this.player = videojs(this.targetElement.nativeElement, this.options, () => {
            console.log('onPlayerReady', this);
        });
        this.playerReady.emit(this.player);
    }

}
