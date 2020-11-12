import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Input, Popconfirm, Form, Button, Modal, Select } from 'antd';
import { getUsersList, saveUser, dropUser, updateUser,showAddModal,closeAddModal,ShowUpadetModel,closeUpdateModal } from '../../store/actions/index';
import 'antd/dist/antd.css';
import './users.css';
const { Option } = Select;



const UserList = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState('');
    // const [editDetails, setEditDetails] = useState('');
    const [editingKey, setEditingKey] = useState('')
    // const [visible, setVisible] = useState(false);
    // const [updateuser, setUpdateuser] = useState(false);
    const roles = props.roleslist;
    useEffect(() => {
        if (props.userlist === undefined) {
            props.getUsersList();

        } else {
            setData(props.userlist);
        }
    }, [props, props.userlist])
    const onFinishUsers = values => {
        props.saveUser(values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    // const showModal = () => {
    //    props.showAddModal()
    // };
    //  const handleUpdateCancel = () => {
    //     setUpdateuser(false)
    // }
    const userDelete = (record) => {
        props.dropUser(record)
    }
    const incrementNumber = () => {
        let i = 0;
        return (index) => {
            return i = i + 1;
        };
    };

    const fromCurrentIndex = incrementNumber();
    const handleEdit = (record) => {
        // setUpdateuser(true)
        props.ShowUpadetModel()
        form.setFieldsValue({
            id: record && record.id,
            name: record && record.name,
            password: record && record.password,
            email: record && record.email,
            role: record && record.rolename,
        })
    };
    const cancel = () => {
        setEditingKey('');
    };
    const onFinishEditModal = values => {
        if (isNaN(values.role)) {
            const roleId = roles.filter(role => role.name === values.role)[0].id;
            values['role'] = roleId;
        }
        props.updateUser(values)

    }
    const columns = [
        {
            title: 'S No',
            dataIndex: 'sno',
            width: '10%',
            render: (text, record, index) => {
                return fromCurrentIndex(index);
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'Password',
            dataIndex: 'password',
            width: '15%',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '40%',
            editable: true,
        },
        {
            title: 'Role',
            dataIndex: 'rolename',
            width: '40%',
            editable: true,
        },

        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => (
                <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                    <DeleteOutlined />
                </Popconfirm>
            ),
            // eslint-disable-next-line no-dupe-keys
            render: (_, record) => {
                return (
                    // eslint-disable-next-line react/jsx-no-comment-textnodes
                    <div>
                        <EditOutlined onClick={() => handleEdit(record)} />
                        <Popconfirm title="Are you sure？" okText="Yes" onConfirm={() => userDelete(record)} cancelText="No">
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
                // editing: isEditing(record),
            }),
        };
    });
    return (
        <div id="userlisttable">
            <Button type="primary" id="useraddbutton" onClick={props.showAddModal}>Add User</Button>
            <Modal
                title="ADD USER"
                visible={props.addvisible}
                onCancel={props.closeAddModal}
            >
                <Form
                    className="login-form"
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinishUsers}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        rules={[{ required: true, message: 'Please select role' }]}
                    >
                        <Select
                            style={{ width: 446 }}
                            placeholder="Select a Role"
                        >
                            {roles && roles.map(role => (
                                <Option value={role.key}>{role.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>


                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
               </Button>
                    </Form.Item>
                </Form>

            </Modal>
            {/* update user model */}
            <Modal
                title="UPDATE USER"
                visible={props.updatevisible}
                onCancel={props.closeUpdateModal}
            >
                <Form form={form}
                    className="login-form"
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinishEditModal}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Username"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Select
                            style={{ width: 446 }}
                            placeholder="Select a Role"
                        // onChange={handleChange}
                        >
                            {roles && roles.map(role => (
                                <Option key={role.key}>{role.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="id"
                        rules={[{ required: true, message: 'Please input your username!' }]} style={{ display: 'none' }}
                    >
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item
                    >
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
    );
};
const mapStateToProps = (state) => ({
    userlist: state.userList,
    roleslist: state.roleList,
    addvisible: state.visibleAddUserModal,
    updatevisible: state.visibleUpdateUserModal,
    
})

const mapDispatchToProps = {
    getUsersList: getUsersList,
    saveUser: saveUser,
    dropUser: dropUser,
    updateUser: updateUser,
    showAddModal: showAddModal,
    closeAddModal: closeAddModal,
    ShowUpadetModel:ShowUpadetModel,
    closeUpdateModal:closeUpdateModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)
