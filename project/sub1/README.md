
# 任务列表

<!-- - [x] 支持 #标签 ，[链接]()，**样式** -->
- [] 增加登录页面
- [] `mock`不实时更新
- [] 多级菜单展示有问题
- [x] 强校验`eslint`, `stylelint`
- [] 用`externals`全局变量
- [] 初始化过渡动画
- [x] 文件更新,缓存导致加载错误的处理

# 使用

- 注意看ts定义文件
- 尽量使用`hooks`编写，注意长逻辑拆分
- 部分ts定义，要通过编译一次后，才能查看
- [umi4内置api](https://umijs.org/docs/api/api#uselocation)
- [umi4运行时配置](https://umijs.org/docs/api/runtime-config)
- 使用`intl`多语言API，出现ts不提示的问题，可以手动改下
    - 1.`node_modules\@umijs\plugins\dist\locale.js` 205,206行，把输出的后缀删除掉
    - 2.重新编译一遍，就有提示了
    - 3.每次操作依赖时候，都会导致代码回滚
    - typescript 不识别带后缀文件...
- 修改`unocss.config.ts`内容后，必须手动重启服务才有效果

## 数据流

- 使用`useModel`作为全局数据流，类组件还是需要使用dva
- 字典数据使用

    ```tsx
        const {initialState} = useModel('@@initialState');
        initialState!.getDictionData('CustomType1');
        initialState!.getDictionData('CustomType1', {toNum: true});
        initialState!.getDictionData('CustomType2', {assignValues: [0, 1, 2]});
        initialState!.getDictionData('CustomType2', {findValue: 4});
    ```

## 入口

- `getInitialState` 页面入口函数，文件位置`src\app.tsx`
- 页面布局参数，通过链接参数控制
    - `hideLeft === '1'` 隐藏右边模块
    - `hideTop === '1'` 隐藏顶部模块
    - `hideAll === '1'` 隐藏所有

## 权限&路由

- 嵌套路由必须以`/`开头，如果自动拼接，会导致`access`匹配不上，导致权限不足
- 路由配置关键字段`access`内容必须和`path`一致(不区分大小写)，才能起到菜单权限判断效果
- 通过`useAccess`可以获取权限数据以及判断函数，文件位置`src\access.ts`
- 如果需要对不在菜单中的页面做权限判断，可以把`access`设置为依附页面的路径
- 功能权限判断，按页面维度来处理

    ```tsx
        const {operaCodeCheck} = useAccess();
        operaCodeCheck('O2');
    ```

- 权限组件，权限Hoc

    ```tsx
        import {Button as OldButton} from 'antd';

        import {AccessDropdown, AccessButton, TAccessDropdownConfig} from '@/components/AccessModules';
        // 高阶组件 accessPackage 扩展组件, 权限码 code 功能
        import {accessPackage} from '@/components/HOC';

        const Button = accessPackage(OldButton);
    ```

## 内置样式

- 除了有说明，其它都是 px为单位

```js
    // 可以使用 unocss vscode插件
    // 边距
    // m-l-1 m-r-5 m-t-5 m-b-5 m-y-10 m-x-10 m-tb-10 m-lr-10 m-10 ...
    // p-l-1 p-r-5 p-t-5 p-b-5 p-y-10 p-x-10 p-tb-10 p-lr-10 p-10 ...

    // px值宽高
    // width100 width200 ...
    // height100 height200 ...

    // 百分比宽高
    // width-100 width-200 ...
    // height-100 height-200 ...

    // 字体大小 font-12 ...

    // 文字对齐 text-center text-right text-left

    // 文字颜色 color-main color-red color-error color-gray

    // 禁止选择 disabled-select

    // 禁止事件 disabled-event

    // 鼠标手势 pointer

    // 定位相关position: abs rel fixed static

    // 隐藏 hidden

    // 弹性盒子
    ['flex', {display: 'flex'}],
    ['f-1', {flex: 1}],
    ['f-initial', {flex: 'initial'}],
    ['f-none', {flex: 'none'}],
    ['f-wrap', {'flex-wrap': 'wrap'}],
    ['f-nowrap', {'flex-wrap': 'nowrap'}],
    ['f-reverse', {'flex-wrap': 'wrap-reverse'}],
    ['f-row', {'flex-direction': 'row'}],
    ['f-col', {'flex-direction': 'column'}],
    // flex的对齐属性
    ['f-justify-center', {'justify-content': 'center'}],
    ['f-justify-end', {'justify-content': 'flex-end'}],
    ['f-justify-start', {'justify-content': 'flex-start'}],
    ['f-justify-around', {'justify-content': 'space-around'}],
    ['f-justify-between', {'justify-content': 'space-between'}],
    ['f-justify-evenly', {'justify-content': 'space-evenly'}],

    ['f-items-center', {'align-items': 'center'}],
    ['f-items-end', {'align-items': 'flex-end'}],
    ['f-items-start', {'align-items': 'flex-start'}],

    ['f-content-center', {'align-content': 'center'}],
    ['f-content-end', {'align-content': 'flex-end'}],
    ['f-content-start', {'align-content': 'flex-start'}],
    ['f-content-around', {'align-content': 'space-around'}],
    ['f-content-between', {'align-content': 'space-between'}],
    ['f-content-evenly', {'align-content': 'space-evenly'}],
```

### 其它插件-unocss

- [git地址](https://github.com/unocss/unocss)
- [资料1](https://youlinkin.com/posts/19-rethinking-atomized-css)

### 资料

- [eslint 命令说明](https://www.jianshu.com/p/4133063d1785)
