import type {ICustomRouter} from "../../../config/routes";

/** 处理路径，比对用 */
export const handlerPath = (url: string, removeLine = false) => {
    if (removeLine) {
        return url.toLocaleLowerCase().replaceAll('/', '');
    }
    return url.toLocaleLowerCase();
}

/** 处理菜单 */
export const handlerMenuData = (list: ICustomRouter[]) => {
    const validMenuDataMap: Record<string, ICustomRouter> = {};
    const allMenuDataMap: Record<string, ICustomRouter> = {};


    const each = (data: typeof list) => {
        data.forEach((item) => {
            const childList = item.routes || item.children;

            if (Array.isArray(childList)) {
                each(childList);
            }

            if (item.path && item.component) {
                validMenuDataMap[item.path] = item;
                validMenuDataMap[handlerPath(item.path)] = item;
                validMenuDataMap[handlerPath(item.path, true)] = item;
            }

            if (item.path) {
                allMenuDataMap[item.path] = item;
                allMenuDataMap[handlerPath(item.path)] = item;
                allMenuDataMap[handlerPath(item.path, true)] = item;
            }
        });
    }

    each(list);

    return {
        validMenuDataMap,
        allMenuDataMap,
        rawData: list,
    }
};
