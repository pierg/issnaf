import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import { Create, useForm, useSelect, Form, Input, Select, DatePicker } from "@pankod/refine-antd";
// import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

export const ProfileCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
    });

    const { selectProps: tagsSelectProps } = useSelect({
        resource: "tags",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name={["title"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Bio"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea rows={5} />
                </Form.Item>
                <Form.Item
                    label="Research Interests"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Tags"
                    name={"tags"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select mode="multiple" {...tagsSelectProps} />
                </Form.Item>
            </Form>
        </Create>
    );
};
