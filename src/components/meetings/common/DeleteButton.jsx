import React from "react";
import {connect} from "react-redux";
import {Button, Popconfirm} from "antd";
import {meetingActions} from "../../../actions";
import {ExclamationCircleTwoTone} from "@ant-design/icons";

/**
 * Button which allows the host of a meeting to delete a meeting.
 *
 * Props:
 * meeting - meeting to be deleted. Must contain isHost, id, and platform values.
 * onDelete {function} - meetingActions function which deletes a meeting
 */
class DeleteButton extends React.Component {
    constructor(props) {
        super(props);

        this.deleteMeeting = this.deleteMeeting.bind(this)
    }

    deleteMeeting(meeting) {
        this.props.deleteMeeting(meeting.id, meeting.platform);
        this.props.onDelete()
    }

    isHost(meeting) {
        if (meeting.isHost) {
            return (
                <Popconfirm title="Are You Sure？" okText="Yes" onConfirm={()=>this.deleteMeeting(meeting)} okType="danger" cancelText="No" icon={<ExclamationCircleTwoTone twoToneColor="#f5222d"/>}>
                    <Button type="danger" ghost>Delete</Button>
                </Popconfirm>
            )
        }
    }

    render() {
        const {meeting} = this.props;
        const button = this.isHost(meeting)
        return (
            <>{button}</>
        )
    }
}

function mapState(state) {
    return {}
}

const actionCreators = {
    deleteMeeting : meetingActions.deleteMeeting,

}

const connectedComponent = connect(mapState, actionCreators)( DeleteButton);
export { connectedComponent as DeleteButton };
