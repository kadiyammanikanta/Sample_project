import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { Row, Col } from 'antd';
import {
    HomeOutlined,
    SettingFilled,
    HeatMapOutlined,
    ContactsOutlined,
    UsergroupAddOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './grid.css';
import { setpageName} from '../../store/actions/index';

const Grid = (props) => {
    const history = useHistory();

    useEffect(() => {
        if (!props.user) {
            history.push("/");
        }
    }, [history, props.user]);
    const colCount = 3;
    const pageList = props && props.user && props.user.pageList;

    const pageIds = pageList && pageList.map(item => item.id)
    const handleClick = (page) => {
      // eslint-disable-next-line no-undef
      setpageName(page);
        switch (page) {
            case 'settings':
                history.push("/settings");
                break;
            case 'users':
                history.push("/users");
                break;
            case 'contacts':
                history.push("/contacts");
                break;
            case 'list':
                history.push("/list");
                break;
            default:
                break;
        }
    }

    return (<div id="rolelisttable">
        <Row className='grid-row' gutter={[8, 24]}>
            {pageList && pageIds.includes(1) &&
                <Col id='home-col' span={24 / colCount}  >
                    <div className='col-1 text_align' id="homeicon">
                        <HomeOutlined className='icon' to="home" />
                        <span className="hometext">Home</span>
                    </div>

                </Col>
            }
            {pageList && pageIds.includes(2) &&
                <Col id='heat-col' span={24 / colCount} onClick={() => handleClick('list')} >
                    <div className='col-4 text_align'  ><HeatMapOutlined className='icon' to="" />
                        <span className="hometext">Map</span>
                    </div>
                </Col>
            }
            {pageList && pageIds.includes(3) &&
                <Col id="clock-col" span={24 / colCount} >
                    <div className='col-3 text_align'><ClockCircleOutlined className='icon' /><span className="hometext">Clock</span>
                    </div>
                </Col>
            }

            {/* </Row>
         <Row className='grid-row' 
         gutter={[8, 24]}
         > */}
            {pageList && pageIds.includes(5) &&
                <Col id='user-col' span={24 / colCount} onClick={() => handleClick('users')}>
                    <div className='col-2 text_align'><UsergroupAddOutlined className='icon' /><span className="hometext">User
                    </span>
                    </div>
                </Col>
            }
            {pageList && pageIds.includes(6) &&
                <Col span={24 / colCount} id="contact-col" onClick={() => handleClick('contacts')} >
                    <div className='col-5 text_align'><ContactsOutlined className='icon' />
                        <span className="hometext">Contacts</span>
                    </div>
                </Col>
            }
            {pageList && pageIds.includes(8) &&
                <Col id="setting-col" span={24 / colCount} onClick={() => handleClick('settings')} >
                    <div className='col-6 text_align'><SettingFilled className='icon' /><span className="hometext">Setting</span>
                    </div>
                </Col>
            }
        </Row>
    </div>)
}

const mapStateToProps = (state) => ({
    user: state.activeUser
})

  const mapDispatchToProps = {
    setpageName:setpageName
  };



export default connect(
    mapStateToProps,
 mapDispatchToProps
)(Grid)
