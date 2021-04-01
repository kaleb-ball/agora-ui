import React from "react";
import {connect} from "react-redux";
import {Button, List, Popconfirm, Skeleton} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {meetingActions} from "../../../actions";
import './DayComponent/DayComponent.css'
import {ExclamationCircleTwoTone, MoreOutlined} from "@ant-design/icons";
import {platform_color, platform_name} from "../../../constants/platformConstants";


class MeetingComponent extends React.Component {
    constructor(props) {
        super(props);

        this.startMeeting = this.startMeeting.bind(this)
        this.avatar = this.avatar.bind(this)
    }

    startMeeting(id) {
        if (id) this.props.startMeeting(id);
    }

    avatar(platform) {
        return <Avatar style={{ color: '#E7F1FD', backgroundColor: platform_color(platform), fontSize:"x-large"}}>{platform_name(platform).charAt(0)}</Avatar>
    }


    render() {
        const {meeting} = this.props;
        return (
            <List.Item
                actions={[
                    <Button onClick={() => this.startMeeting(meeting.id)} type="primary" ghost>Start</Button>,
                    <Popconfirm title="Are You Sure？" okText="Yes" okType="danger" cancelText="No" icon={<ExclamationCircleTwoTone twoToneColor="#f5222d"/>}>
                        <Button type="danger" ghost>Delete</Button>
                    </Popconfirm>,
                    <Button icon={<MoreOutlined />}/>

                ]}
            >
                <Skeleton loading={false}>
                    <List.Item.Meta
                        avatar={this.avatar(meeting.platform)}
                        title={meeting.title}
                        description={meeting.description}
                    />
                    {meeting.start_time.toLocaleTimeString([], {hour12:true, hour:'2-digit', minute:'2-digit'})} - {meeting.end_time.toLocaleTimeString([], {hour12:true, hour:'2-digit', minute:'2-digit'})}
                </Skeleton>
            </List.Item>
        )
    }
}

function mapState(state) {
    return {}
}

const actionCreators = {
    startMeeting : meetingActions.startMeeting
}

const connectedComponent = connect(mapState, actionCreators)( MeetingComponent);
export { connectedComponent as MeetingComponent };
