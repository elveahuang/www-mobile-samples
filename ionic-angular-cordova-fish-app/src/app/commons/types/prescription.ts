import FishMeal from './fish-meal';

class Prescription {
    /**
     * 配方名
     */
    title?: string;
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
