import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Login from '../login/login.component';
import Dashboard from '../dashboard/dashboard.component';
import Setting from '../settings/setting.component';
import Loader from '../loader/loader.component';
import UserList from '../users/users.component';
import Contact from '../contact/contact.component';
import List from '../list/list.component';
import SiderDemo from '../menu/menu';
import '../../App.css';
const Home = (props) => {
    const currentPage = props.route ;
    return (<>
        {props.loading ? <Loader /> :
            <>
                <div className="App">
                    <header className="App-header">
                        {currentPage === 'login' &&  <Login />}
                        {currentPage === 'dashboard' &&  <Dashboard />}
                        {currentPage === 'settings' &&  <Setting />}
                        {currentPage === 'users' &&  <UserList/>}
                        {currentPage === 'contacts' && <Contact/>}
                        {currentPage === 'list' && <List/>}
                        {currentPage === 'menu' && <SiderDemo/>}
                    </header>
                </div>
            </>
        }

    </>
    )
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    currentScreen:state.currentScreen
})

//   const mapDispatchToProps = {
//     checkLogin: checkLogin,
//   };



export default connect(
    mapStateToProps,
    null
)(Home)
