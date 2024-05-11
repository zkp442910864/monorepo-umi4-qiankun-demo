/* eslint-disable react-hooks/rules-of-hooks */

import {qiankun} from '@/utils/base/initQiankun';

import {system1} from '../config/routes/system1';
import {handlerMenuData} from "./utils/base/handlerMenuData";
import type {ICustomRouter} from "../config/routes";

/** https://umijs.org/zh-CN/plugins/plugin-initial-state */
export async function getInitialState () {
    let menuData: TObj[] = [];
    let dictionaries = undefined;
    let getDictionData = undefined;
    let userData: TObj | undefined = undefined;
    let [validMenuDataMap, allMenuDataMap] = [{}, {}] as Record<string, ICustomRouter>[];

    try {

        // TODO: 前置请求，注意报错处理
        const [ajaxMenuData, ajaxUserData] = await Promise.all<TObj[]>([
            Promise.resolve({fake: true, data: system1}),
            Promise.resolve({data: {}}),
            Promise.resolve({data: {}}),
        ]);


        ({validMenuDataMap, allMenuDataMap} = handlerMenuData(ajaxMenuData.data));
        menuData = ajaxMenuData.data;
        userData = ajaxUserData.data;
        // dictionaries = mapData;
        // getDictionData = getDictionDataFn;
    } catch (error) {
        console.error(error);
    }

    const data = {
        /** 用户数据 */
        userData,
        /** 菜单数据 */
        menuData,
        /** 有效菜单映射 */
        validMenuDataMap,
        /** 所有菜单映射，包括 children */
        allMenuDataMap,
        /** 字典数据(一次性拿下所有数据) */
        dictionaries: dictionaries!,
        /** 获取字典数据的函数 */
        getDictionData: getDictionData!,
    };

    if (process.env.NODE_ENV === 'development') {
        console.log('初始化数据', data);
    }

    return data;
}

// export function rootContainer (container: any) {
//     return React.createElement(KeepAliveProvider, null, container);
// }

export {qiankun};
