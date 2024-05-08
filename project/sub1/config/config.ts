import {defineConfig} from 'umi';
import path from 'path';

import routes from './routes';
import chainWebpack from './chainWebpack';
import proxy from './proxy';
import {devConfig, testConfig, proConfig} from './env';

export default defineConfig({
    // html title
    title: 'system',
    favicons: ['./favicon.png'],
    // 配置额外的 meta 标签。
    metas: [],
    // 图片转 base64
    inlineLimit: 10000,

    // 插件
    plugins: [
        '@umijs/plugins/dist/initial-state',
        '@umijs/plugins/dist/access',
        '@umijs/plugins/dist/locale',
        '@umijs/plugins/dist/model',
        // '@umijs/plugins/dist/layout',
        '@umijs/plugins/dist/antd',
        '@umijs/plugins/dist/unocss',
        '@umijs/plugins/dist/qiankun',
        // path.resolve(process.cwd(), './node_modules/@umijs/plugin-dva/src/index')
        // path.resolve(process.cwd(), './config/plugins/plugin-unocss'),
    ],
    qiankun: {
        // 子应用标识
        slave: {},
        // 主应用标识
        master: {},
    },
    // 插件配置
    initialState: {},
    access: {},
    model: {},
    // layout: {},
    locale: {
        // 默认使用 src/locales/zh-CN.ts 作为多语言文件
        // default: 'en-US',
        default: 'zh-CN',
        baseSeparator: '-',
    },
    antd: {
        // style: 'less',
        // import: false,
        // configProvider: {},
    },
    unocss: {
        // 添加其他包含 unocss 的 classname 的文件目录
        // TODO: linux 下，深层目录会检测不到文件里的class内容
        watch: [
            'src/**/*.tsx',
            'src/**/**/*.tsx',
            'src/**/**/**/*.tsx',
            'src/**/**/**/**/*.tsx',
            'src/**/**/**/**/**/*.tsx',
            'src/**/**/**/**/**/**/*.tsx',
            // 'src/**/*.jsx',
            // 'components/**/*.tsx',
            // 'components/**/*.jsx',
        ],
    },
    // 全局属性，只支持字符串
    define: {
        // ENV: '...',
        // process.env.BUILD_TYPE === 'test'
        ...typeof process.env.BUILD_TYPE === 'undefined' ? devConfig : {},
        ...process.env.BUILD_TYPE === 'test' ? testConfig : {},
        ...process.env.BUILD_TYPE === 'pro' ? proConfig : {},
        'process.env.BUILD_TYPE': process.env.BUILD_TYPE,
    },
    // 配置 webpack 的 publicPath。
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
    // 非根目录的情况下，会使用到
    base: '/',
    // 配置 less 变量主题。
    theme: {},
    // 路径映射
    alias: {
        '@': path.resolve(process.cwd(), 'src'),
    },
    // 路由方式
    history: {
        type: 'hash',
    },
    routes,
    // 设置按需引入的 polyfill。默认全量引入。
    // polyfill: {
    //     imports: [],
    // },
    // 配置需要兼容的浏览器最低版本。Umi 会根据这个自定引入 polyfill、配置 autoprefixer 和做语法转换等。
    targets: {
        // ie: 11,
        chrome: 58,
        firefox: 58,
        edge: 58,
        safari: 58,
    },

    // 输出目录
    outputPath: 'dist',

    // 配置额外需要做 Babel 编译的 NPM 包或目录
    // extraBabelIncludes: [],

    // 配置额外的 babel 插件。可传入插件地址或插件函数。
    extraBabelPlugins: [] as any[],

    // 配置额外的 babel 插件集。可传入插件集地址或插件集函数。
    extraBabelPresets: [],

    // 排除不打包的内容
    externals: {},
    // 配置 <head> 中的额外 script。
    headScripts: [],

    // 包管理
    npmClient: 'pnpm',
    // 检测未使用的文件和导出，仅在 build 阶段开启。
    // deadCode: {},

    // 忽略 moment 的 locale 文件，用于减少产物尺寸。
    ignoreMomentLocale: true,
    // 配置额外的 link 标签。
    links: [],
    // 配置 <body> 中额外的 script 标签。
    scripts: [],
    // 产物增加hash
    hash: true,
    // mock 目录
    // mock: false as any,
    mock: {
        include: [
            // '../mock/**/*.ts',
            // 'mock/**/*.ts',
            // '/mock/**/*.ts',
        ],
    },
    // 配置webpack
    chainWebpack: chainWebpack as () => any,
    // 代理
    proxy,
    // 这个开启后会影响加密软件？
    // clientLoader: {},

    // 提供别人访问时候，要设置为false
    // mfsu: false,
});
