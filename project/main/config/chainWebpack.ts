import Config from 'webpack-chain';
import path from 'path';

// https://github.com/neutrinojs/webpack-chain
const fn = (memo: Config, args: any) => {

    // memo.entry('').add
    // memo.module.rule
    // memo.plugin().use

    // memo.resolve.alias.set('foo', '/tmp/to/foo');

    memo.resolve.alias
        .set('moment', path.resolve(__dirname, '../', './node_modules/moment'))
        .set('lodash', path.resolve(__dirname, '../', './node_modules/lodash'));

    // 检查重复
    // memo.plugin('duplicate-package-checker-webpack-plugin').use(new DuplicatePackageCheckerPlugin({
    //     emitError: true,
    //     verbose: true,
    // }));

    // 正式环境
    if (process.env.NODE_ENV === 'production') {
        // gzip 压缩
        // memo.plugin('compression-webpack-plugin').use(new CompressionPlugin());
    }

};

export default fn;
