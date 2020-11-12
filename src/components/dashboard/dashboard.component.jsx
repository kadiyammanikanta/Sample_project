import React from 'react';
import { connect } from 'react-redux';
import { logOut ,setRoute} from '../../store/actions/index';
import Grid from '../grid/grid.component';
import './dashboard.css'

const Dashboard = (props) => {
  return (
    <div>
      <Grid />
    </div>
    )
};
const mapStateToProps = (state) => ({
loginuser: state.activeUser,
})

const mapDispatchToProps = {
  
  setRoute:setRoute

};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
// export default Dashboard;