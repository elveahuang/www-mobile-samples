/**
 * 初始化
 */
import Prescription from '../types/prescription';
import FishMeal from '../types/fish-meal';

export function createPrescription(): Prescription {
    const p = new Prescription();
    p.items = new Array<FishMeal>();
    p.items.push(new FishMeal());
    p.items.push(new FishMeal());
    p.items.push(new FishMeal());
    p.items.push(new FishMeal());
    p.items.push(new FishMeal());
    p.items.push(new FishMeal());
    p.items.push(new FishMeal());
    p.totalResult = new FishMeal();
    p.finalResult = new FishMeal();
    return p;
}
