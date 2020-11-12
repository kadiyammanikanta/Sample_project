import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './menu.css';
import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SettingOutlined,
  ContactsOutlined,
  ClockCircleOutlined,
  HeatMapOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import Image from 'material-ui-image';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import Login from '../login/login.component';
import Dashboard from '../dashboard/dashboard.component';
import Setting from '../settings/setting.component';
import UserList from '../users/users.component';
import Contact from '../contact/contact.component';
import List from '../list/list.component';
// import Grid from '../grid/grid.component';
import { useHistory } from "react-router-dom";
import { setSession, logOut } from '../../store/actions/index';
import { useIdleTimer } from 'react-idle-timer';
const { Header, Sider, Content } = Layout;

const SiderDemo = (props) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const currentPage = props.route;
  const pageList = props && props.user && props.user.pageList;
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!props.user) {
      const sessionUser = window.sessionStorage.getItem("user");
      if (sessionUser) {
        props.setSession(JSON.parse(sessionUser))
      } else {
        history.push("/");
      }
    }
  }, [history, props, props.user]);
  const toggle = () => {
    setCollapsed(!collapsed)
  };
  const logOutuser = () => {
    history.push("/");
    props.logOut();
    window.sessionStorage.setItem("user", '');
  }
  const login = () => {
    return (
      <div className="ptaglogout">
        <p>{pageList && pageList.name}</p>
      </div>
    )
  }
  const menu = (
    <Menu>
      <div className="usericonlogout">
        <UserOutlined />
      </div>
      <Menu.Item>
        {login()}
      </Menu.Item>
      <Menu.Item>
        <a onClick={logOutuser}>
          Log out
        </a>
      </Menu.Item>
    </Menu>
  );
  const getRouteNumber=(route)=>{
    const routeList ={
      dashboard:"1",
      settings:"2",
      users:"3",
      contacts:"8"
    }
    return routeList[route]
  }
  const getIcon = (page) => {
    switch (page) {
      case 'setting':
        return <SettingOutlined />
      case 'user list':
        return <UserOutlined />
      case 'clock':
        return <ClockCircleOutlined />
      case 'contactus':
        return <ContactsOutlined />
      case 'maps':
        return <HeatMapOutlined />
      case 'graph':
        return <BarChartOutlined />
      case 'gallery':
        return <UserOutlined />
      default:
        break;
    }
  }
  const handleMenuClick = (page) => {
    switch (page) {
      case 'setting':
        history.push("/settings");
        break;
      case 'user list':
        history.push("/users");
        break;
      case 'contacts':
        history.push("/contacts");
        break;
      case 'list':
        history.push("/list");
        break;
      case 'dashboard':
        history.push("/dashboard");
        break;
      default:
        break;
    }
  }
  const handleOnIdle = event => {

    window.sessionStorage.setItem("user", '');
    props.setSession('')
    history.push("/");
  }

  const handleOnActive = event => {
    console.log('user is active', event)
    console.log('time remaining', getRemainingTime())
  }

  const handleOnAction = (e) => {
    console.log('user did something', e)
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 3000 * 1,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })
  return (
    <div id="rolelisttable">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo_bg-color">
            <div className="logo" >
              <Image src="pp.jpg" style={{ width: 45, height: 45, borderColor: 'red', borderWidth: 3, borderRadius: 45 / 2, overflow: "hidden" }} />
            </div>
          </div>
          <Menu theme="dark" mode='inline' selectedKeys={[getRouteNumber(currentPage)]}>
            <Menu.Item key="1" icon={<VideoCameraOutlined />}
              onClick={() => handleMenuClick('dashboard')}>
              Dashboard
            </Menu.Item>
            {pageList && pageList.map(item => {
              return (<Menu.Item key={item.id + 1} icon={getIcon(item.name)}
                onClick={() => handleMenuClick(item.name)} id="menutext">
                {item.name}
              </Menu.Item>)
            })}

          </Menu>
        </Sider>
        <Layout className="site-layout">

          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <div className="logoutuser">
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link"
                  onClick={e => e.preventDefault()}>
                  <div className="usericon-color">
                    <div>
                      <Image src="pp.jpg" style={{ width: 45, height: 45, borderColor: 'red', borderWidth: 3, borderRadius: 45 / 2, overflow: "hidden" }} />
                    </div>
                    <div className="userName">
                      <span>mani</span>
                    </div>
                  </div>
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content
            className="site-layout-background"
          // style={{
          //   margin: '24px 16px',
          //   padding: 24,
          //   minHeight: 280,
          // }}
          >
            <div className="site-layout-background" style={{ padding: 24, minHeight: 645 }}>
              {currentPage === 'login' && <Login />}
              {currentPage === 'dashboard' && <Dashboard />}
              {currentPage === 'settings' && <Setting />}
              {currentPage === 'users' && <UserList />}
              {currentPage === 'contacts' && <Contact />}
              {currentPage === 'list' && <List />}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
const mapStateToProps = (state) => ({
  loading: state.loading,
  user: state.activeUser,

  currentScreen: state.currentScreen
})

const mapDispatchToProps = {
  setSession: setSession,
  logOut: logOut,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderDemo)
