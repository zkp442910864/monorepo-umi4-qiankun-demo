import {KeepAliveProvider} from "@/layouts/BasicLayout/modules/KeepAlive";
import {QIANKUN} from "@/utils/base/initQiankun";
import ProLayout from "@ant-design/pro-layout";
import {ConfigProvider} from "antd";
import {Link, createSearchParams, history, useAccess, useAppData, useLocation, useModel, useNavigate} from 'umi';
import {useRef} from "react";
import Footer from "../Footer";
import Content from "./modules/Content";

// ProLayout 支持的api https://procomponents.ant.design/components/layout
const BasicLayout = () => {
    const location = useLocation();
    const appData = useAppData();
    // const accessObj = useAccess();
    // const navigate = useNavigate();
    const initialState = useModel('@@initialState').initialState;
    // const queryData = createSearchParams(history.location.search);
    // const hideLeft = queryData.get('hideLeft') === '1';
    // let hideAll = queryData.get('hideAll') === '1';
    const divRef = useRef<HTMLDivElement>(null);

    // console.log('appData', appData);
    // console.log('accessObj', accessObj);
    // console.log('initialState', initialState);
    // console.log('keepAliveRoutes', keepAliveRoutes);
    // console.log('keepAliveMap', keepAliveMap);
    // console.log(history.location.pathname);
    // console.log(keepAliveMap[history.location.pathname]);
    // console.log('context', context);

    return (
        <ConfigProvider>
            <KeepAliveProvider renderContent={divRef}>
                <ProLayout
                    {...{
                        location,
                        title: 'main',
                        logo: './favicon.png',
                        className: QIANKUN ? undefined : 'p-0 un-h-100vh',
                        menu: {
                            locale: false,
                        },
                        token: {
                            header: {
                                colorBgHeader: '#fcfcfc',
                            },
                            bgLayout: '#fff',
                            pageContainer: {
                                paddingBlockPageContainerContent: 0,
                                paddingInlinePageContainerContent: 0,
                            },
                        },
                        // 顶部高度
                        headerHeight: 55,
                        // 右部菜单栏宽度
                        siderWidth: 255,
                        // 布局
                        layout: 'side',
                        // 固定头部
                        fixedHeader: true,
                        // 固定右部
                        fixSiderbar: true,
                        disableContentMargin: true,
                        // ...hideLeft ? {layout: 'top'} : {},
                        // ...hideAll ? {menuRender: false, headerRender: false, footerRender: false} : {},
                        onMenuHeaderClick: (e) => {
                            // e.stopPropagation();
                            // e.preventDefault();
                            // navigate('/');
                        },
                        menuItemRender: (menuItemProps, defaultDom) => {
                            if (menuItemProps.isUrl || menuItemProps.children) {
                                return defaultDom;
                            }
                            if (menuItemProps.path && location.pathname !== menuItemProps.path) {
                                return (
                                    // handle wildcard route path, for example /slave/* from qiankun
                                    <Link to={menuItemProps.path.replace('/*', '')} target={menuItemProps.target}>
                                        {defaultDom}
                                    </Link>
                                );
                            }
                            return defaultDom;
                        },
                        // logout: () => {
                        //     // console.log('退出逻辑', 1);
                        //     window.localStorage.removeItem('Authorization');
                        // },
                        // 底部
                        footerRender: () => <Footer />,
                        // 顶部右边栏
                        rightContentRender: () => <></>,
                        // 传入菜单数据
                        menuDataRender: () => {
                            return initialState?.menuData || [];
                        },
                        // 每打开一个路由触发
                        onPageChange: () => {},
                    }}
                >
                    <Content renderContent={divRef} />
                </ProLayout>
            </KeepAliveProvider>
        </ConfigProvider>
    );
}

export default BasicLayout;
