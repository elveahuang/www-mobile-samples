import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {VideoPlayerComponent} from '@commons/core/components/video-player.component';

// 公用组件
const SharedComponents = [
    VideoPlayerComponent
];
const EntryComponents = [];
const SharedDirectives = [];

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        IonicModule,
    ],
    entryComponents : [
        ...EntryComponents,
    ],
    declarations : [
        ...SharedComponents,
        ...SharedDirectives,
    ],
    exports : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        IonicModule,
        //
        ...SharedComponents,
        ...SharedDirectives,
    ],
})
export class SharedModule {
}
