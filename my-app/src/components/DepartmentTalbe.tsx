import React, { Component, useState, useEffect } from 'react'
import { Table, Tag, Space, Button } from 'antd';
import { title } from 'process';
import { EmployeeModel, DepartmentModel } from '../utils/DataModel';
import {
    Layout, Menu, Breadcrumb, Avatar, Card, Divider, Input,
    message, Pagination, Select, Skeleton, Typography, Upload, Tooltip,
    Col, Row, Descriptions, Form, Radio, Drawer, Popconfirm
} from 'antd'
import { staticApi } from '../utils/http-common';
import { Basement, Container } from './BasicHTMLElement'
import { Router } from 'react-router';
import { waitFor } from '@testing-library/react';

import {
    UserOutlined,
    UploadOutlined,
    SettingOutlined,
    StarOutlined,
    UserSwitchOutlined,
    FormOutlined,
    LockOutlined,
    HomeOutlined,
    VideoCameraOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
} from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;

const { Search } = Input;
const { SubMenu } = Menu;
const { Column, ColumnGroup } = Table;

export const DepartmentTable = (props: {}) => {
    const [data, setData] = useState<Array<DepartmentModel>>([]);
    const [employee, setEmployee] = useState<Array<EmployeeModel>>([]);
    const [visible, setVisible] = useState(false);
    const [dataForm] = Form.useForm();
    const [opt, setOpt] = useState(0);

    const showDrawer = () => {
        setVisible(true);
    }

    useEffect(
        () => {
            getData();
        }, []
    )

    const getData = async () => {
        const res = await staticApi.get('/department', {})
        // console.log("source:", res);
        if (res.data.success) {
            setData(res.data.data);
        } else {
            message.error(res.data.message)
        }
    }


    const getEmployee = async (record: DepartmentModel) => {
        const res = await staticApi.get('/employee/department', {
            params: {
                dno: record.dno
            }
        })
        // console.log("source:", res);
        if (res.data.success) {
            setEmployee(res.data.data);
        } else {
            message.error(res.data.message)
        }
    }

    const deleteElement = async (text: any, record: any, index: any) => {
        // console.log(record.dno);
        const res = await staticApi.delete('/department/delete', {
            params: {
                dno: record.dno
            }
        })
        // console.log("source:", res);
        if (res.data.success) {
            message.success('????????????');
            getData();
        } else {
            message.error(res.data.message)
        }
    }

    const onSearch = async (e: string) => {
        // console.log(e);
        const res = await staticApi.get('/department/search', {
            params: {
                searchitem: e
            }
        })
        // console.log("source:", res);
        if (res.data.success) {
            setData(res.data.data);
        } else {
            message.error(res.data.message)
        }
    }

    const handleSubmit = async (values: DepartmentModel) => {
        console.log(values);
        const checkReg = /\s+/;
        if (values.dname !== undefined && values.dname.search(checkReg) !== -1) message.error('???????????????????????????');
        else if (values.dno !== undefined && values.dno.toString().search(checkReg) !== -1) message.error('???????????????????????????');
        else if (values.address !== undefined && values.address.toString().search(checkReg) !== -1) message.error('???????????????????????????');
        else {
            if (opt == 0) {
                const res = await staticApi.post('/department/new', {
                    params: {
                        dno: values.dno,
                        dname: values.dname,
                        address: values.address,
                        bossno: values.bossno
                    }
                });
                // console.log(res);
                if (res.data.success) {
                    message.success('????????????')
                    dataForm.resetFields();
                    setVisible(false);
                    getData();
                } else {
                    message.warning(res.data.message)
                }
            } else {
                const res = await staticApi.post('/department/update', {
                    params: {
                        dname: values.dname,
                        address: values.address,
                        dno: values.dno,
                        bossno: values.bossno
                    }
                });
                console.log(res);
                if (res.data.success) {
                    message.success('????????????')
                    dataForm.resetFields();
                    setVisible(false);
                    getData();
                } else {
                    message.warning(res.data.message)
                }
            }
        }
    }


    return (
        <>
            <div className="site-layout-background" style={{ paddingBottom: 24, display: 'flex' }}>
                <Search
                    placeholder="input search text"
                    allowClear={true}
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    style={{ width: '25%' }}
                />

                <Button type="primary" size="large"
                    style={{ marginLeft: 24, display: 'flex', alignItems: 'center' }}
                    onClick={() => { showDrawer(); setOpt(0); }}
                >
                    <PlusOutlined></PlusOutlined>??????
                </Button>
                <Drawer
                    title={opt === 1 ? `????????????` : `????????????`}
                    placement="right"
                    size='default'
                    visible={visible}
                    onClose={() => {
                        setVisible(false);
                        if (opt === 1) dataForm.resetFields();
                    }}
                >
                    <Form labelCol={{ span: 8 }} onFinish={handleSubmit} form={dataForm}>
                        <Form.Item wrapperCol={{ span: 10 }} name="dno" label="?????????" rules={[{ required: true, message: 'Please input Info' }]}>
                            <Input disabled={opt === 1} onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="dname" label="????????????" rules={[{ required: true, message: 'Please input Info' }]}>
                            <Input onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="address" label="????????????" rules={[{ required: true, message: 'Please input Info' }]}>
                            <Input onPressEnter={(e) => { e.preventDefault() }} allowClear />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10 }} name="bossno" label="????????????" hidden={opt === 0}>
                            <Select placeholder="??????????????????">
                                <Select.Option value={''}>??????</Select.Option>
                                {employee.map((item) =>
                                    <Select.Option value={item.eno}>{item.eno}{"  "}{item.ename}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10 }}>
                            <Button type="primary" htmlType="submit">??????</Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
            <Table dataSource={data} pagination={false} bordered={true}>
                <Column title="?????????" dataIndex="dno" key="dno" />
                <Column title="????????????" dataIndex="dname" key="dname" />
                <Column title="????????????" dataIndex="address" key="address" />
                <ColumnGroup title="????????????" >
                    <Column title="??????" dataIndex="bossno" key="bossno" />
                    <Column title="??????" dataIndex="ename" key="ename" />
                </ColumnGroup>
                <Column
                    title="??????"
                    key="action"
                    render={(text, record: DepartmentModel, index) => (
                        <Space>
                            <Button type="primary"
                                onClick={() => { showDrawer(); dataForm.setFieldsValue(record); setOpt(1); getEmployee(record); }}
                            >
                                ??????
                            </Button>
                            <Popconfirm onConfirm={() => { deleteElement(text, record, index) }}
                                title="Are you sure?"
                                icon={<QuestionCircleOutlined
                                    style={{ color: 'red' }} />}
                                okText={<a>??????</a>}
                                cancelText={<a>??????</a>}
                            >
                                <Button type="dashed">??????</Button>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
        </>)
}
