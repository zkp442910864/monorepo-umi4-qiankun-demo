

const {generateApi} = require('swagger-typescript-api');
const path = require('path');

const common = {
    // 清除目录，生成
    cleanOutput: true,
    // 生成文件名称
    name: 'index',
    // 格式化
    prettier: {
        printWidth: 200,
        tabWidth: 4,
        trailingComma: 'all',
        parser: 'typescript',
    },
    // 生成api
    generateClient: true,
    // 分模块生成
    // modular: true,
    // 按 tag 分
    // nameFirstTag: false,
    // 使用axios
    httpClientType: 'axios',
    // 自定义模板  生成多个模块文件
    // templates: path.resolve(process.cwd(), './api-templates/custom-multi-module'),
    // 自定义模板  生成单文件
    templates: path.resolve(process.cwd(), './api-templates/custom-single-module'),
    hooks: {
        onCreateRouteName: (routeNameInfo, rawRouteInfo) => {
            // if (rawRouteInfo.route.match(/{.+}/)) return routeNameInfo;
            const pathName = rawRouteInfo.route
                // .substring(1)
                // .replace(/({[a-z|A-Z|0-9]+})/, `${rawRouteInfo.method}/$1`)
                // .replace(/\{|\}/g, '')
                // .replace(/\/(\w)/g, (p, m) => m.toUpperCase());
                .substring(1)
                .replace(/({[a-z|A-Z|0-9]+})/, `${rawRouteInfo.method}/$1`)
                .replace(/\{|\}/g, '')
                // .replace(/\/(\w)/g, (p, m) => m.toUpperCase())
                .replace(/(\/(\w)|-(\w))/g, (p, m, m2, m3) => (m2 || m3).toUpperCase());
            routeNameInfo.usage = pathName;
            routeNameInfo.original = pathName;
            return {...routeNameInfo};
        },
        onFormatTypeName: (typeName, rawTypeName, schemaType) => {
            return typeName.replace(/�|：|、/g, '');
        },
    },
};

(async () => {

    const BASE_URL = 'https://xxx.xxx.xxx.com';

    await generateApi({
        ...common,
        // url: 'http://10.10.158.140:9200/coupon/v2/api-docs',
        url: `${BASE_URL}/auth/v3/api-docs`,
        output: path.resolve(process.cwd(), './src/services/auto/auth'),
    });

})();


