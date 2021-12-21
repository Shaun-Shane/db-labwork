import { Table, Tag, Space, Button } from 'antd';
import { title } from 'process';
import {EmployeeModel} from '../utils/DataModel';

const { Column, ColumnGroup } = Table;

export const EmployeeTable = (props: {data: any}) => {
    return (
        <Table dataSource={props.data} pagination={false} bordered={true}>
            <Column title="编号" dataIndex="eno" key="eno" />
            <Column title="姓名" dataIndex="ename" key="ename" />
            <Column title="性别" dataIndex="gender" key="gender" />
            <Column title="年龄" dataIndex="age" key="age" />
            <Column title="部门号" dataIndex="dno" key="dno" />
            <Column title="部门名称" dataIndex="dname" key="dname" />
            <Column
                title="操作"
                key="action"
                render={(text, record) => (
                    <Space>
                        <Button>分配项目</Button>
                        <Button type="primary">修改</Button>
                        <Button type="dashed">删除</Button>
                    </Space>
                )}
            />
        </Table>)
}
