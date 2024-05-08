import {createSearchParams, history} from 'umi';

/** 重置链接 */
export const resetPath = (config: IData = {}) => {
    const {
        exclude,
        assign,
    } = config;
    const queryData = createSearchParams(history.location.search);

    // 保留参数
    const otherData = [...queryData.keys()].reduce((map, key) => {
        // 排除
        if (Array.isArray(exclude) && exclude.includes(key)) return map;

        // 指定
        if (Array.isArray(assign) && !assign.includes(key)) return map;

        map[key] = queryData.get(key)!;

        return map;
    }, {} as Record<string, string>);

    const newQueryStr = Object.keys(otherData).length ? `?${createSearchParams(otherData)}` : '';
    // window.location.replace(`#${window.location.pathname}${newQueryStr}`);
    history.replace(history.location.pathname + newQueryStr);
};

interface IData {
    /**
     * 排除指定字段
     * 优先于 assign
     */
    exclude?: string[];
    /**
     * 指定返回字段
     */
    assign?: string[];
}
