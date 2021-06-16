/**
 * 主题类型
 */
export enum ThemeType {
    DEFAULT,
    GREEN,
    BLUE,
}

/**
 * 主题
 */
export type Theme = {
    key: ThemeType;
    primaryColor: string;
    primarySecondary: string;
};

/**
 * 默认主题
 */
export const defaultTheme = ThemeType.DEFAULT;

/**
 * 对齐方式枚举
 */
export enum DirectionType {
    LTR = 'ltr',
    RTL = 'rtl',
}

/**
 * 默认对齐方式
 */
export const defaultDirection = DirectionType.LTR;

/**
 * 内置主题
 */
export const themes: Array<Theme> = [
    {
        key: ThemeType.DEFAULT,
        primaryColor: 'green',
        primarySecondary: 'green',
    },
    {
        key: ThemeType.GREEN,
        primaryColor: 'red',
        primarySecondary: 'red',
    },
    {
        key: ThemeType.BLUE,
        primaryColor: 'blue',
        primarySecondary: 'blue',
    },
];

/**
 * 设置主题
 */
export const setTheme = (theme: ThemeType = defaultTheme) => {
    const t = themes.find((element) => element.key === theme);
    document.body.style.setProperty('--color-primary', t.primaryColor);
    document.body.style.setProperty('--color-secondary', t.primarySecondary);
};

export default themes;
