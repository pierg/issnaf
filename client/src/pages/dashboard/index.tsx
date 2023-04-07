import { Row, Col, Card, Typography } from "@pankod/refine-antd";
import { useTranslation } from "react-i18next";

import { sf2, issnaf, posts } from "assets"

import {
    DailyRevenue,
    DailyOrders,
    NewCustomers,
    DeliveryMap,
    OrderTimeline,
    RecentOrders,
    TrendingMenu,
} from "components";

const { Text } = Typography;

export const DashboardPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Row gutter={[16, 16]}>
            <Col md={24}>
                <Row gutter={[16, 16]}>
                    <Col xl={8} lg={16} md={24} sm={24} xs={24}>
                        <Card
                            bodyStyle={{
                                padding: 10,
                                paddingBottom: 0,
                            }}
                            style={{
//                                 background: `url(${posts})`,
                                backgroundColor: "#86bacf",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right",
                            }}
                            hoverable={true}
                        >
                            <DailyRevenue />
                        </Card>
                    </Col>
                    <Col xl={8} lg={16} md={24} sm={24} xs={24}>
                        <Card
                            bodyStyle={{
                                padding: 10,
                                paddingBottom: 0,
                            }}
                            style={{
//                                 background: "url(images/daily-order.png)",
                                backgroundColor: "#879d85",
                                backgroundRepeat: "no-repeat",
                            }}
                            hoverable={true}
                        >
                            <DailyOrders />
                        </Card>
                    </Col>
                    <Col xl={8} lg={16} md={24} sm={24} xs={24}>
                        <Card
                            bodyStyle={{
                                padding: 10,
                                paddingBottom: 0,
                            }}
                            style={{
//                                 background: "url(images/new-orders.png)",
                                backgroundColor: "#b0465a",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right",
                            }}
                            hoverable={true}
                        >
                            <NewCustomers />
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col xl={17} lg={16} md={24} sm={24} xs={24}>
             <Card
                    bodyStyle={{
                        height: 600,
                        overflowY: "scroll",
                    }}
                    title={
                        <Text strong>{t("dashboard.recentOrders.title")}</Text>
                    }
                >
                    <RecentOrders />
                </Card>
            </Col>
            <Col xl={7} lg={16} md={24} sm={24} xs={24}>
                <Card
                    bodyStyle={{
                        height: 600,
                        overflowY: "scroll",
                    }}
                    title={
                        <Text strong style={{ textTransform: "capitalize" }}>
                            {t("dashboard.timeline.title")}
                        </Text>
                    }
                >
                    <OrderTimeline />
                </Card>
            </Col>
            <Col xl={17} lg={16} md={24} sm={24} xs={24}>
             <Card
                    bodyStyle={{
                        height: 600,
                        overflowY: "scroll",
                    }}
                    title={
                        <Text strong>Your Projects</Text>
                    }
                >
                    <RecentOrders />
                </Card>
            </Col>
            <Col xl={7} lg={8} md={24} sm={24} xs={24}>
                <Card
                    title={
                        <Text strong>Messages</Text>
                    }
                >
                    <TrendingMenu />
                </Card>
            </Col>
        </Row>
    );
};
