/**
 * 公告服务
 */
import { Injectable } from '@angular/core';
import Prescription from '../types/prescription';
import { isEmpty, round } from 'lodash';
import FishMeal from '../types/fish-meal';
import { Storage } from '@ionic/storage-angular';
import { generateUuid } from '../utils';

@Injectable()
export class PrescriptionService {
    constructor(private storage: Storage) {
        this.init();
    }

    init(): void {
        this.storage.create().then();
    }

    public async getPrescriptionList(): Promise<Prescription[]> {
        const list: Prescription[] = [];
        const map: Map<string, Prescription> = await this.storage.get('DATA');
        for (const p of map.values()) {
            list.push(p);
        }
        return list;
    }

    public async savePrescription(p: Prescription): Promise<void> {
        if (isEmpty(p.uuid)) {
            p.uuid = generateUuid();
        }
        let map: Map<string, Prescription> = await this.storage.get('DATA');
        if (isEmpty(map)) {
            map = new Map<string, Prescription>();
        }
        map.set(p.uuid, p);
        await this.storage.set('DATA', map);
    }

    public createPrescription(): Prescription {
        const p = new Prescription();
        p.items = new Array<FishMeal>();
        p.items.push(new FishMeal('鱼粉一'));
        p.items.push(new FishMeal('鱼粉一'));
        p.items.push(new FishMeal('鱼粉一'));
        p.items.push(new FishMeal('鱼粉一'));
        p.items.push(new FishMeal('鱼粉一'));
        p.items.push(new FishMeal('鱼粉一'));
        p.items.push(new FishMeal('鱼粉一'));
        p.totalResult = new FishMeal('合计', 0);
        p.finalResult = new FishMeal('结果', 0);
        return p;
    }

    public calcPrescription(p: Prescription): Prescription {
        p.totalResult.reset();
        p.finalResult.reset();
        if (!isEmpty(p.items)) {
            p.items.forEach((item) => {
                p.totalResult.peiBi += item.peiBi;
                p.totalResult.danBai += item.peiBi * item.danBai;
                p.totalResult.huiFen += item.peiBi * item.huiFen;
                p.totalResult.xinXianDu += item.peiBi * item.xinXianDu;
                p.totalResult.shuiFen += item.peiBi * item.shuiFen;
                p.totalResult.zhiFan += item.peiBi * item.zhiFan;
                p.totalResult.jiaGe += item.peiBi * item.jiaGe;
            });
            p.finalResult.danBai = round(p.totalResult.danBai / p.totalResult.peiBi, 2);
            p.finalResult.huiFen = round(p.totalResult.huiFen / p.totalResult.peiBi, 2);
            p.finalResult.xinXianDu = round(p.totalResult.xinXianDu / p.totalResult.peiBi, 2);
            p.finalResult.shuiFen = round(p.totalResult.shuiFen / p.totalResult.peiBi, 2);
            p.finalResult.zhiFan = round(p.totalResult.zhiFan / p.totalResult.peiBi, 2);
            p.finalResult.jiaGe = round(p.totalResult.jiaGe / p.totalResult.peiBi, 2);
        }
        return p;
    }
}
