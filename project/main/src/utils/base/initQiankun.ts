/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

/** qiankun 标识 */
export const QIANKUN = window.__POWERED_BY_QIANKUN__ || false;
/** 父应用传入的参数 */
export const qiankunParentProps = {
    /** 父应用传入的前缀 */
    path_prefix: '',
};

export const qiankun = {
    // 子应用加载之前
    async bootstrap (props: any) {
        qiankunParentProps.path_prefix = props?.prefix || '';
    },
    // 子应用 render 之前触发
    async mount (props: any) {
        // console.log('app1 mount', props);
    },
    // 子应用卸载之后触发
    async unmount (props: any) {
        // console.log('app1 unmount', props);
    },
};
