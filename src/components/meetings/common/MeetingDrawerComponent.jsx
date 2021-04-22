import React from "react";
import {connect} from "react-redux";
import {Button, Col, Divider, Drawer, Popconfirm, Row, Space, Tag} from "antd";
import {meetingActions, userActions} from "../../../actions";
import '../home/UpcomingMeetingsComponent/DayComponent/DayComponent.css'
import {
    CalendarOutlined,
    ExclamationCircleTwoTone,
    GoogleOutlined,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import {ParticipantList} from "./ParticipantList";
import {JoinButton} from "./JoinButton";
import {format} from 'date-fns'


class MeetingDrawerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.startMeeting = this.startMeeting.bind(this)

        this.props.getUsers()

    }

    startMeeting(id, platform) {
        if (id && platform) this.props.startMeeting(id, platform);
    }

    getParticipants(meeting) {
        if (meeting.isHost) {
            let participants = [];
            meeting.participants.forEach(participant => participants.push(participant.username))
            return(
                <Row>
                    <Col span={6}>Participants:</Col>
                    <Col span={18}>
                        <ParticipantList meeting={meeting}  participants={participants} />
                    </Col>
                </Row>
            )
        }
    }

    getHost(meeting, users) {
        if(!meeting.isHost && users) {
            let host = users.filter(user => user.id === meeting.hostId)[0]
                if (host) {
                    return (
                        <>
                            <Row>
                                <Col span={6}>Host:</Col>
                                <Col span={18}>{host.firstname} {host.lastname}</Col>
                            </Row>
                            <Row>
                                <Col span={6}/>
                                <Col span={18}>{host.username}</Col>
                            </Row>
                        </>

                    )
                }
        }
    }

    render() {
        const {meeting, visible, users} = this.props;
        const participants = this.getParticipants(meeting)
        const host = this.getHost(meeting, users)
        return (
            <div>
                <Drawer
                    width="45%"
                    placement="right"
                    closable={true}
                    onClose={this.props.onClose}
                    visible={visible}
                >
                    <Row>
                        <Col span={6}>Topic:</Col>
                        <Col span={18}>{meeting.title}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>Description:</Col>
                        <Col span={18}>{meeting.description}</Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={6}>Platform:</Col>
                        <Col span={18}>{meeting.platform}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>Meeting ID:</Col>
                        <Col span={18}>{meeting.id}</Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={6}>Date:</Col>
                        <Col>{format(meeting.start_time, 'PPP')}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>Time:</Col>
                        <Col span={18}>{meeting.start_time.toLocaleTimeString([], {hour12:true, hour:'2-digit', minute:'2-digit'})} - {meeting.end_time.toLocaleTimeString([], {hour12:true, hour:'2-digit', minute:'2-digit'})}</Col>
                    </Row>
                    <Row>
                        <Col span={6}/>
                        <Col span={18}>
                            <Space>
                                <Text>Add to</Text>
                                <Tag icon={<GoogleOutlined />} color='#4285F4'>Google</Tag>
                                <Tag icon={<CalendarOutlined/>}>Other</Tag>
                            </Space>
                        </Col>
                    </Row>
                    <Divider/>
                    {participants}
                    {host}
                    <Divider/>
                    <Row>
                        <Space>
                            <JoinButton meeting={meeting}/>
                            <Popconfirm title="Are You Sure？" okText="Yes" okType="danger" cancelText="No" icon={<ExclamationCircleTwoTone twoToneColor="#f5222d"/>}>
                                <Button type="danger" ghost>Delete</Button>
                            </Popconfirm>
                        </Space>
                    </Row>
                </Drawer>
            </div>
        )
    }
}

function mapState(state) {
    return {
        users : state.getAllUsers.users
    }
}

const actionCreators = {
    startMeeting : meetingActions.startMeeting,
    getUsers : userActions.getAllUsers
}

const connectedComponent = connect(mapState, actionCreators)( MeetingDrawerComponent);
export { connectedComponent as MeetingDrawerComponent };
