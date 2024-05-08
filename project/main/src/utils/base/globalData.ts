// import {useAccess} from 'umi';
import {useEffect, useState} from 'react';

import access from '@/access';
import {getInitialState} from '@/app';

/** 全局数据 */
const globalData = {
    xxx: 1,
    /** 全局的头部高度 入口处初始化 */
    offsetHeader: 0,
    /** 全局的useAccess 入口处初始化 */
    accessObj: {} as ReturnType<typeof access>,
    /** 全局的 initialState 入口处初始化 */
    initialStateObj: {} as Awaited<ReturnType<typeof getInitialState>>,
};

/** 提供来监听全局参数，触发组件重新渲染的hooks */
export const useGlobalDataEffect = (deps: any | any[]) => {
    const [, update] = useState({});

    useEffect(() => {
        update({});
    }, Array.isArray(deps) ? deps : [deps]);
};

export default globalData;
