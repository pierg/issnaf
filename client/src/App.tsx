import React from "react";
import { Refine, Authenticated } from "@pankod/refine-core";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import routerProvider from "@pankod/refine-react-router-v6";
//     CatchAllNavigate,
//     NavigateToResource,
//     UnsavedChangesNotifier,
// } from "@pankod/refine-react-router-v6";
import {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
    notificationProvider,
    ThemedLayout,
    ErrorComponent,
} from "@refinedev/antd";
import { Icons, Layout }from "@pankod/refine-antd";
import jsonServerDataProvider from "@pankod/refine-simple-rest";
import { authProvider } from "authProvider";

import "dayjs/locale/de";

import { DashboardPage } from "./pages/dashboard";
import { ProfileCreate } from "./pages/profile";
import { OrderList, OrderShow } from "./pages/orders";
import { AuthPage } from "./pages/auth";
import { UserList, UserShow } from "./pages/users";
import {
    CourierList,
    CourierShow,
    CouriersCreate,
    CouriersEdit,
} from "./pages/couriers";
import { ProductList } from "./pages/products";
import { StoreCreate, StoreEdit, StoreList } from "./pages/stores";
import { CategoryList } from "./pages/categories";
import { ReviewsList } from "./pages/reviews";
import { useTranslation } from "react-i18next";
import { Header, Title, OffLayoutArea } from "components";

import "@pankod/refine-antd/dist/reset.css";

const App: React.FC = () => {
    const API_URL = "https://api.finefoods.refine.dev";
    const dataProvider = jsonServerDataProvider(API_URL);

    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <RefineKbarProvider>
            <Refine
                routerProvider={{
                    ...routerProvider,
                    routes: [
                        {
                            path: "/register",
                            element: (
                                <AuthPage
                                    type="register"
                                    formProps={{
                                        initialValues: {
                                            email: "demo@refine.dev",
                                            password: "demodemo",
                                        },
                                    }}
                                />
                            ),
                        },
                        {
                            path: "/forgot-password",
                            element: <AuthPage type="forgotPassword" />,
                        },
                        {
                            path: "/update-password",
                            element: <AuthPage type="updatePassword" />,
                        },
                    ],
                }}
                dataProvider={dataProvider}
                authProvider={authProvider}
                OffLayoutArea={OffLayoutArea}
                i18nProvider={i18nProvider}
                DashboardPage={DashboardPage}
                LoginPage={() => (
                    <AuthPage
                        type="login"
                        formProps={{
                            initialValues: {
                                email: "demo@refine.dev",
                                password: "demodemo",
                            },
                        }}
                    />
                )}
                Title={Title}
                Header={Header}
                Layout={Layout}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
                resources={[
                    {
                        name: "posts",
                        list: OrderList,
                        show: OrderShow,
                        icon: <Icons.FormOutlined />,
                    },
                    {
                        name: "users",
                        list: UserList,
                        show: UserShow,
                        icon: <Icons.UsergroupAddOutlined />,
                    },
                    {
                        name: "projects",
                        list: StoreList,
                        edit: StoreEdit,
                        create: StoreCreate,
                        icon: <Icons.FundOutlined />,
                    },

                    {
                        name: "events",
                        list: StoreList,
                        edit: StoreEdit,
                        create: StoreCreate,
                        icon: <Icons.CalendarOutlined />,
                    },
                ]}
                notificationProvider={notificationProvider}
                catchAll={<ErrorComponent />}
            />
        </RefineKbarProvider>
    );
};

export default App;
