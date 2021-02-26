import React, { Component } from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import teamActivityTypeList from "../reducers/team";
import  Activity  from './Activity';

class TeamActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
          <Activity className="Activity" id={localStorage.getItem("teamID")} activityTypeList={this.props.teamActivityTypeList}/>
      </div>
      
    )
  }
}


function mapStateToProps(state) {
  return {
    teamActivityTypeList: state.teamActivityTypeList
  }
}

export default connect(mapStateToProps)(withRouter(TeamActivity))
