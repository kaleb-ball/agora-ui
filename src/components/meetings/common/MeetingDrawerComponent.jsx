import React from "react";
import {connect} from "react-redux";
import {Button, Col, Divider, Drawer, Popconfirm, Row, Space, Tag, Tooltip} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {meetingActions} from "../../../actions";
import '../home/UpcomingMeetingsComponent/DayComponent/DayComponent.css'
import {
    AntDesignOutlined,
    CalendarOutlined,
    ExclamationCircleTwoTone,
    GoogleOutlined,
    UserOutlined
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";


class MeetingDrawerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.startMeeting = this.startMeeting.bind(this)
/*        this.showDrawer = this.showDrawer.bind(this)
        this.onClose = this.onClose.bind(this)*/
    }

    startMeeting(id, platform) {
        if (id && platform) this.props.startMeeting(id, platform);
    }

/*
    showDrawer() {
        this.setState({
            visible : true
        })
    }

    onClose() {
        this.setState({
            visible : false
            }
        })*/


    render() {
        const {meeting, visible} = this.props;
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
                    <Row>
                        <Col span={6}>Participants:</Col>
                        <Col span={18}>
                            <Avatar.Group maxCount={10} size="large">
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                <Tooltip title="Ant User" placement="top">
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                </Tooltip>
                                <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
                            </Avatar.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}/>
                        <Col span={18}>
                            <Space>
                                <Button>View All</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Space>
                            <Button type="primary" ghost>Start</Button>
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
    return {}
}

const actionCreators = {
    startMeeting : meetingActions.startMeeting
}

const connectedComponent = connect(mapState, actionCreators)( MeetingDrawerComponent);
export { connectedComponent as MeetingDrawerComponent };
