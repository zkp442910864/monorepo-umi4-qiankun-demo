import {defineConfig} from 'umi';

const proxy: ReturnType<typeof defineConfig>['proxy'] = {
    '/api-guangxian/': {
        target: 'http://10.10.159.11:7001/',
        changeOrigin: true,
        pathRewrite: {'^/api-guangxian': ''},
    },
};

export default proxy;
