import React from "react";
import {connect} from "react-redux";
import {Button} from "antd";
import {meetingActions} from "../../../actions";

/**
 * Button which starts the meeting for the host, but only lets invitees join the meeting
 *
 * Props:
 * meeting - meeting to be started/joined; must contain isHost, id, and platform values.
 * startMeeting {function} - meetingAction function called to start a meeting
 * joinMeeting {function} - meetingAction function called to join a meeting.
 */
class JoinButton extends React.Component {
    constructor(props) {
        super(props);

        this.startMeeting = this.startMeeting.bind(this)
    }

    startMeeting(meeting) {
       this.props.startMeeting(meeting.id, meeting.platform);
    }

    joinMeeting(meeting) {
        this.props.joinMeeting(meeting)
    }

    startOrJoin(meeting) {
        if (meeting.isHost) {
            return <Button onClick={()=>this.startMeeting(meeting)} type="primary" ghost>Start</Button>
        } else {
            return <Button onClick={()=>this.joinMeeting(meeting)} type="primary" ghost>Join</Button>
        }
    }

    render() {
        const {meeting} = this.props;
        const button = this.startOrJoin(meeting)
        return (
            <div>
                {button}
            </div>
        )
    }
}

function mapState(state) {
    return {}
}

const actionCreators = {
    startMeeting : meetingActions.startMeeting,
    joinMeeting : meetingActions.joinMeeting
}

const connectedComponent = connect(mapState, actionCreators)( JoinButton);
export { connectedComponent as JoinButton };
