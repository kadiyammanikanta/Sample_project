import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Popconfirm, Form, Button, Modal, Select, Checkbox, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { RoleList, saveRole, delecteRole,updateRole } from '../../store/actions/index';
import 'antd/dist/antd.css';
import './setting.css';

const Setting = (props) => {
    const CheckboxGroup = Checkbox.Group;
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const defaultCheckedList = ['Apple', 'Orange'];
    const [form] = Form.useForm();
    const [data, setData] = useState('');
    const [visible, setVisible] = useState(false);
    const [updateuser, setUpdateuser] = useState(false);
    const [pageList, setPageList] = useState('')
    const [originalPagesList, setOriginalPagesList] = useState();
    const [checkedList, setCheckedList] = useState(defaultCheckedList)
    const [indeterminate, setIndeterminate] = useState(true)
    const [checkAll, setCheckAll] = useState(false)
    const incrementNumber = () => {
        let i = 0;
        return (index) => {
            return i = i + 1;
        };
    };
    const fromCurrentIndex = incrementNumber();

    useEffect(() => {
        if (props.rolelists === undefined) {
            props.RoleList();
        } else {
            setData(props.rolelists);
            if (props.pagelist) {
                setPageList(props.pagelist)
                setOriginalPagesList(props.pagelist.map(item => { return item.name }))
            }
        }
    }, [props, props.rolelists])

    const onChange = checkedList => {
        setCheckedList(checkedList)
        setIndeterminate(!!checkedList.length && checkedList.length < originalPagesList.length)
        setCheckAll(checkedList.length === originalPagesList.length)
    };
   
    const handleEdit = (record) => {
        const ownedList = record.page_id.split(',');
        const checkList = pageList.map(item => {
            if (ownedList.includes(item.id.toString())) {
                return item.name
            }
        })
        setCheckedList(checkList)
        setUpdateuser(true)
        form.setFieldsValue({
            id: record && record.id,
            name: record && record.name
        })

    }
    const handleCancel = () => {
        setVisible(false)
    };

    const showModal = () => {
        setVisible(true);
    };
    const handleUpdateCancel = () => {
        setUpdateuser(false)
    }
    const onFinish = values => {
        props.saveRole(values);
        setVisible(false)
    };
    const onFinishUpdaterole =values =>{
        let checkList = pageList.map(item => {
            if (checkedList.includes(item.name)) {
                return item.id.toString()
            }
            return null;
        })
         checkList = checkList.filter(Boolean).toString();
        values['pageid']=checkList
        console.log('checkedList',checkList)
        props.updateRole(values);
        setUpdateuser(false)
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const cancel = () => {
    };
    const roleDelete = (record) => {
        props.delecteRole(record)
    }
    
    const columns = [
        {
            title: 'S NO',
            dataIndex: 'sno',
            width: '25%',
            render: (text, record, index) => {
                return fromCurrentIndex(index);
            }
        },
        {
            title: 'name',
            dataIndex: 'name',
            width: '15%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            // eslint-disable-next-line no-dupe-keys
            render: (_, record) => {
                return (
                    // eslint-disable-next-line react/jsx-no-comment-textnodes
                    <div>
                        <EditOutlined onClick={() => handleEdit(record)} />
                        <Popconfirm title="Are you sure？" okText="Yes" onConfirm={() => roleDelete(record)} cancelText="No">
                            <DeleteOutlined />
                        </Popconfirm>
                    </div>
                );
            },
        }
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });
    return (
        <div id="rolelisttable">
            <Button type="primary" id="useraddbutton" onClick={showModal} >Add Role</Button>
            <Modal
                title="ADD ROLE"
                visible={visible}
                onCancel={handleCancel}
            >
                <Form
                    className="login-form"
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Rolename" />
                    </Form.Item>
                    <h3>Select Page</h3>
                    <Form.Item
                        name="pageid"
                        rules={[{ required: true, message: 'Please select pages!' }]} >
                             <Checkbox.Group style={{ width: '100%' }} >
                            <Row>
                                <Col span={8}>
                                    <Checkbox value="1">SETTING</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="2">USER LIST</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="3">GALLERY</Checkbox>
                                </Col>
                                <Col span={8} id="clock">
                                    <Checkbox value="4">CLOCK</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="5">MAPS</Checkbox>
                                </Col>
                                <Col span={7} id="graph">
                                    <Checkbox value="6">GRAPH</Checkbox>
                                </Col>
                                <Col span={9}>
                                    <Checkbox value="8">CONTACTS</Checkbox>
                                </Col>
                            </Row>
                            </Checkbox.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
            <Modal
                title="UPDATE ROLE"
                visible={updateuser}
                onCancel={handleUpdateCancel}
            >
                <Form form={form}
                    className="login-form"
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinishUpdaterole}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Rolename" />
                    </Form.Item>
                    <h3 >Select Page</h3>
                    <Form.Item
                        name="pageid"
                        rules={[{ required: false, message: 'Please select pages!' }]}
                    >
                        <Row >
                            <>
                                <Col >
                                <CheckboxGroup span={8}
                                    options={originalPagesList}
                                    value={checkedList}
                                    onChange={onChange}
                                />
                                </Col>
                            </>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        name="id"
                        rules={[{ required: true, message: 'Please input your username!' }]} style={{ display: 'none' }}
                    >
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
            <Form component={false}>
                <Table
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>

    )
}

const mapStateToProps = (state) => ({
    rolelists: state.roleLists,
    pagelist: state.pageList
})

const mapDispatchToProps = {
    RoleList: RoleList,
    saveRole: saveRole,
    updateRole:updateRole,
    delecteRole: delecteRole
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting)
