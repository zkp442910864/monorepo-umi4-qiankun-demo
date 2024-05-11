import {Modal} from 'antd';

const event = {
    interval: 0 as any,
    lock: false,
    rawErrorLog: undefined as any,
    /** 版本更新 触发 */
    versionUpdate: () => {
        if (event.lock) return;
        event.lock = true;
        Modal.confirm({
            // keyboard: false,
            title: '检测到版本更新，点击确认刷新页面',
            content: '如无效请手动清缓存 \n 或者检查网络环境',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                window.location.reload();
            },
            onCancel: () => {
                event.lock = false;
            }
        });
    },
    /** 获取 html 字符串 */
    getHtmlStr: async (queryStr: string) => {
        const res = await fetch(`${window.location.origin}${window.location.pathname}${queryStr}`);
        const newHtml = await res.text();

        return newHtml;
    },
    /** 检测版本更新 */
    checkVersionUpdate: async (cacheHtml: string) => {
        const newHtml = await event.getHtmlStr(`?v=${Date.now()}`);

        if (!cacheHtml) {
            return;
        }

        if (newHtml !== cacheHtml) {
            event.versionUpdate();
        }
    },
    /** 循环检查版本变更 */
    loopVersion: async () => {
        const initHtmlStr = await event.getHtmlStr('');

        event.interval = setInterval(() => {
            event.checkVersionUpdate(initHtmlStr);
        }, 1000 * 60 * 10);
    },
    /** promise 错误抛出 */
    unhandledrejectionHandler: (e: any) => {
        // console.log('unhandledrejection', e);
        // 错误推到 error
        throw e.reason;
    },
    /** 错误处理 */
    errorHandler: (e: any) => {
        // ChunkLoadError: Loading chunk
        // console.log(e);

        const errorName = e?.error?.name;
        if (
            // 资源加载出错，统一为文件找不到，尝试刷新页面
            errorName === 'ChunkLoadError' ||
            ['LINK', 'SCRIPT'].includes((e?.target as TObj)?.nodeName)
        ) {
            event.versionUpdate();
        }
        return true;
    },
    /** 开发环境错误日志过滤 */
    consoleErrorHandler: (type: 'start' | 'stop') => {
        if (process.env.NODE_ENV === 'development') {
            if (type === 'start') {
                event.rawErrorLog = console.error;
                const collectWarningError = (window as TObj).collectWarningError = [] as any;
                console.log('%c window.collectWarningError 收集了所有警告信息', 'color:red');
                console.error = function (...arg) {
                    const e = arg[0];
                    if (
                        // e?.startsWith?.('Warning:') ||
                        e?.startsWith?.('Warning: [antd:') ||
                        e?.startsWith?.('Warning: Attempted to synchronously unmount a root while React was already rendering.')
                    ) {
                        collectWarningError.push(arg);
                        return;
                    }
                    event.rawErrorLog.call(this, ...arg);
                };
            }
            else {
                console.error = event.rawErrorLog;
                event.rawErrorLog = undefined;
            }
        }
    },
    start: () => {
        event.consoleErrorHandler('start');
        event.loopVersion();
        window.addEventListener('unhandledrejection', event.unhandledrejectionHandler, true);
        window.addEventListener('error', event.errorHandler, true);
    },
    stop: () => {
        event.consoleErrorHandler('stop');
        clearInterval(event.interval);
        window.removeEventListener('unhandledrejection', event.unhandledrejectionHandler, true);
        window.removeEventListener('error', event.errorHandler, true);
    }
}

event.start();
