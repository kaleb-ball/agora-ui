import React from "react";
import {connect} from "react-redux";
import {Button, List, Popconfirm, Skeleton} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {meetingActions} from "../../../actions";
import '../home/UpcomingMeetingsComponent/DayComponent/DayComponent.css'
import {ExclamationCircleTwoTone, MoreOutlined} from "@ant-design/icons";
import {platform_color, platform_name} from "../../../constants/platformConstants";


class MeetingDrawerComponent extends React.Component {

}

function mapState(state) {
    return {}
}

const actionCreators = {
    startMeeting : meetingActions.startMeeting
}

const connectedComponent = connect(mapState, actionCreators)( MeetingDrawerComponent);
export { connectedComponent as MeetingDrawerComponent };
