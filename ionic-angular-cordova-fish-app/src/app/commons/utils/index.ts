/**
 * 初始化
 */
import { v4 } from 'uuid';

export function generateUuid(): string {
    return v4();
}
