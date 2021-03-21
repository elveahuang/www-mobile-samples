/**
 * 用户凭证
 */
class FishMeal {
    /**
     * 样品名
     */
    yangPinMing = '鱼粉';
    /**
     * 配比
     */
    peiBi: number;
    /**
     * 蛋白
     */
    danBai: number;
    /**
     * 灰份
     */
    huiFen: number;
    /**
     * 新鲜度
     */
    xinXianDu: number;
    /**
     * 水份
     */
    shuiFen: number;
    /**
     * 脂肪
     */
    zhiFan: number;
    /**
     * 价格
     */
    jiaGe: number;

    constructor(
        yangPinMing: string,
        peiBi?: number,
        danBai?: number,
        huiFen?: number,
        xinXianDu?: number,
        shuiFen?: number,
        zhiFan?: number,
        jiaGe?: number,
    ) {
        this.yangPinMing = yangPinMing;
        this.peiBi = peiBi | 1;
        this.danBai = danBai | 0.0;
        this.huiFen = huiFen | 0.0;
        this.xinXianDu = xinXianDu | 0.0;
        this.shuiFen = shuiFen | 0.0;
        this.zhiFan = zhiFan | 0.0;
        this.jiaGe = jiaGe | 0.0;
    }

    reset(): void {
        this.peiBi = 0;
        this.danBai = 0.0;
        this.huiFen = 0.0;
        this.xinXianDu = 0.0;
        this.shuiFen = 0.0;
        this.zhiFan = 0.0;
        this.jiaGe = 0.0;
    }
}

export default FishMeal;
