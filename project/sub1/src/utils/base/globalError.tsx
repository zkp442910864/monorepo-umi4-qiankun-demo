import {Modal} from 'antd';

/** 版本更新 触发 */
const versionUpdate = (() => {
    let lock = false;
    return () => {
        if (lock) return;
        lock = true;
        Modal.confirm({
            // keyboard: false,
            title: '检测到版本更新，点击确认刷新页面',
            content: '如无效请手动清缓存 \n 或者检查网络环境',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                window.location.reload();
            },
        });
    };
})();

/** 获取 html 字符串 */
const getHtmlStr = async (queryStr: string) => {
    const res = await fetch(`${window.location.origin}${window.location.pathname}${queryStr}`);
    const newHtml = await res.text();

    return newHtml;
};

/** 检测版本更新 */
const checkVersionUpdate = async (cacheHtml: string) => {
    const newHtml = await getHtmlStr(`?v=${Date.now()}`);

    if (!cacheHtml) {
        return;
    }

    if (newHtml !== cacheHtml) {
        versionUpdate();
    }
};

// 轮询检测版本
(async () => {
    const initHtmlStr = await getHtmlStr('');

    setInterval(() => {
        checkVersionUpdate(initHtmlStr);
    }, 1000 * 60 * 10);
})();


// 拦截 antd 的不必要提示
{
    if (process.env.NODE_ENV === 'development') {
        const rawErrorLog = console.error;
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
            rawErrorLog.call(this, ...arg);
        };
    }
}


// 错误拦截
window.addEventListener('unhandledrejection', (e) => {
    // console.log('unhandledrejection', e);
    // 错误推到 error
    throw e.reason;
}, true);


window.addEventListener('error', (e) => {
    // ChunkLoadError: Loading chunk
    // console.log(e);

    const errorName = e?.error?.name;
    if (
        // 资源加载出错，统一为文件找不到，尝试刷新页面
        errorName === 'ChunkLoadError' ||
        ['LINK', 'SCRIPT'].includes((e?.target as TObj)?.nodeName)
    ) {
        versionUpdate();
    }
    return true;
}, true);

