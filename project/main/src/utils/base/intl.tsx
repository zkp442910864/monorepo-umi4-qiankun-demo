/* eslint-disable no-redeclare */
import {getIntl as rawGetIntl, getLocale} from 'umi';
import {ReactNode} from 'react';

const getIntl = (() => {
    let intl: ReturnType<typeof rawGetIntl>;
    return () => {
        if (!intl) {
            intl = rawGetIntl(getLocale());
        }

        return intl;
    };
})();

/**
 * 获取语言资源，支持替换成dom
 * @param key 多语言key
 * @param defaultMessage 默认文本
 * @param options 替换项
 * @param inlineDom 是否插入dom
 * @returns string | JSX.Element
 */
export function formatMessage (key: string, defaultMessage?: string, options?: Record<string, string | number | ReactNode>): string;
export function formatMessage (key: string, defaultMessage: string, options: Record<string, string | number | ReactNode>, inlineDom: false): string;
export function formatMessage (key: string, defaultMessage: string, options: Record<string, string | number | ReactNode>, inlineDom: true): JSX.Element;
export function formatMessage (key: string, defaultMessage?: string, options?: Record<string, string | number | ReactNode>, inlineDom?: boolean) {
    const rawFormatMessage = getIntl().formatMessage;
    const keys = Object.keys(options || {});

    if (!options || !keys.length || !inlineDom) {
        return rawFormatMessage({id: key, defaultMessage: defaultMessage}, options as Record<string, string | number>);
    }

    const str = rawFormatMessage({id: key, defaultMessage: defaultMessage});
    const arr: Array<string | number | ReactNode> = [];
    keys.forEach((k) => {
        const strArr = str.split(`{${k}}`);
        arr.push(strArr[0]);
        arr.push(options[k]);
        arr.push(strArr[1]);
    });

    return (
        <>
            {
                arr.map((dom, index) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <span key={index}>{dom}</span>;
                })
            }
        </>
    );
}

/** 获取语言 */
export const getLanguage = () => {
    const extLocale = getLocale();
    let str = '';
    switch (extLocale.toLowerCase()) {
        case 'en-us':
            str = 'en_us';
            break;
        default:
            str = 'zh_cn';
            break;
    }

    return str as 'en_us' | 'zh_cn';
};

/** 获取语言 */
export const getInputLanguage = getLanguage;

export default {
    formatMessage,
    getLanguage,
    getInputLanguage,
};
