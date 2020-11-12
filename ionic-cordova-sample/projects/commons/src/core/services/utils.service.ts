import {Injectable} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

/**
 * 工具类的方法服务
 */
@Injectable()
export class UtilsService {

    constructor(private statusBar : StatusBar,
                private splashScreen : SplashScreen,
                private platform : Platform,
    ) {
    }

    /**
     * 是否是Cordova或者Capacitor应用
     */
    isHybrid() : Promise<boolean> {
        return this.platform.ready().then(() => {
            return this.platform.is('hybrid');
        });
    }

    /**
     * 是否是安卓设备
     */
    isAndroid() : Promise<boolean> {
        return this.platform.ready().then(() => {
            return this.platform.is('android');
        });
    }

    /**
     * 初始化
     */
    async initializeApp() : Promise<void> {
        if (await this.isHybrid()) {
            if (await this.isAndroid()) {
                this.statusBar.styleLightContent();
            } else {
                this.statusBar.styleDefault();
            }
            this.splashScreen.hide();
        }
    }

}
