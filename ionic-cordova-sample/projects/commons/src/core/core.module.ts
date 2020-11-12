import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@commons/core/shared.module';
import {UtilsService} from '@commons/core/services/utils.service';

@NgModule({
    imports : [CommonModule, SharedModule],
    providers : [
        UtilsService,
    ]
})
export class CoreModule {
    static forRoot() : ModuleWithProviders<CoreModule> {
        return {
            ngModule : CoreModule,
        };
    }
}
