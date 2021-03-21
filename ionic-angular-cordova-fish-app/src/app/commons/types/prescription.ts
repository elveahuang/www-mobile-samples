import FishMeal from './fish-meal';

class Prescription {
    /**
     * 配方名称
     */
    title?: string;
    /**
     * 配方目的
     */
    objective?: string;
    /**
     * 样品
     */
    items?: FishMeal[];
    /**
     * 合集
     */
    totalResult?: FishMeal;
    /**
     * 最终结果
     */
    finalResult?: FishMeal;
}

export default Prescription;
