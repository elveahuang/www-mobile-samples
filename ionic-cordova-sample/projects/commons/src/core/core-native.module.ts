import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SharedModule} from '@commons/core/shared.module';
import {UtilsService} from '@commons/core/services/utils.service';

@NgModule({
    imports : [CommonModule, SharedModule],
    providers : [
        UtilsService,
        SplashScreen,
        StatusBar,
    ]
})
export class CoreNativeModule {
    static forRoot() : ModuleWithProviders<CoreNativeModule> {
        return {
            ngModule : CoreNativeModule,
        };
    }
}
