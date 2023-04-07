import { useMemo, useState } from "react";
import { useApiUrl, useCustom, useTranslate } from "@pankod/refine-core";
import { Typography, Avatar, Table, Space, Tag, useSimpleList, NumberField, useTable, AntdList } from "@pankod/refine-antd";
import { Line } from "@ant-design/charts";
import { LineConfig } from "@ant-design/plots/lib/components/line";
import dayjs, { Dayjs } from "dayjs";

import { OrderActions } from "components";

import { IncreaseIcon, DecreaseIcon } from "components/icons";

import { ISalesChart, IOrder } from "interfaces";
import {
    DailyRevenueWrapper,
    TitleAreNumber,
    TitleArea,
    TitleAreaAmount,
    RangePicker,
} from "./styled";

const { Text, Paragraph } = Typography;

export const DailyRevenue: React.FC = () => {
    const t = useTranslate();
    const API_URL = useApiUrl();

    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
        dayjs().subtract(7, "days").startOf("day"),
        dayjs().startOf("day"),
    ]);
    const [start, end] = dateRange;

    const query = {
        start,
        end,
    };

    const url = `${API_URL}/dailyRevenue`;
    const { data, isLoading } = useCustom<{
        data: ISalesChart[];
        total: number;
        trend: number;
    }>({
        url,
        method: "get",
        config: {
            query,
        },
    });
     const { listProps } = useSimpleList<IOrder>({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        pagination: {
            pageSize: 6,
            simple: true,
        },
        syncWithLocation: false,
    });

    const { tableProps } = useTable<IOrder>({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        initialPageSize: 1,
        permanentFilter: [
            {
                field: "status.text",
                operator: "eq",
                value: "Pending",
            },
        ],
        syncWithLocation: false,
    });

    const disabledDate = (date: Dayjs) => date > dayjs();

    return (
        <DailyRevenueWrapper>
            <TitleArea>
                <TitleAreaAmount>
                    <Typography.Title level={3}>
                        {t("dashboard.dailyRevenue.title")}
                    </Typography.Title>
                </TitleAreaAmount>
            </TitleArea>

        </DailyRevenueWrapper>
    );
};
