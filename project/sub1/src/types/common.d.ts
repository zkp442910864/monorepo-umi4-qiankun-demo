
/** 对象类型 */
type TObj = Record<string, any>;

/** 权限数据类型 */
type TPermissionCode = {codeData?: {title: string, value: string}};

// interface Window {
//     /** 基础数据 */
//     baseInfo?: any;
// }

/** 数据类型展开 */
type TExpandData<T> = T extends object
    ? {[K in keyof T]: TExpandData<Exclude<T[K], null>>}
    : T;

/**
* 获取组件中 props参数类型
*
* 获取函数中的第一个参数类型
*/
type TGetOneData<T> = T extends (props: infer E) => any ? E : T;

/** 获取接口响应的 data 数据类型 */
type TGetApiResponse<T> = T extends (...data: any) => Promise<{data?: infer E}>
    ? E extends {code?: number; message?: string; total?: number; status?: string; data?: infer E2}
        ? TExpandData<E2>
        : TExpandData<E>
    : never;

/** 获取接口响应的 data 数据额类型 */
type TGetApiResponseV2<T> = T extends (...data: any) => Promise<infer E>
    ? E
    : never;

/**
* 获取接口响应的 data 数据额类型
*
* 更加细化, 排除掉其他选项
*/
type TGetApiResponseDetail<T> = TGetApiResponse<T> extends {[key: string]: any; data?: infer E}
    ? Required<TExpandData<E>>
    : never;

/** 获取组件的 ref */
type TGetComponentRef<T> = Required<Parameters<T>[0]>['ref'] extends ((...arg) => void) | import('React').RefObject<infer E> | null
    ? E
    : never;
