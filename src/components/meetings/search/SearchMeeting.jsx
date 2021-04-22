import React from "react";
import {connect} from "react-redux";
import {Button, Col, Divider, Drawer, List, Popconfirm, Popover, Row, Skeleton, Space, Tag, Tooltip} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {meetingActions} from "../../../actions";
import './SearchMeetingsList.css'
import {
    AntDesignOutlined,
    CalendarOutlined,
    ExclamationCircleTwoTone, GoogleOutlined,
    MoreOutlined,
    UserOutlined
} from "@ant-design/icons";
import {platform_color, platform_name} from "../../../constants/platformConstants";
import Text from "antd/lib/typography/Text";
import {format} from 'date-fns'
import {MeetingDrawerComponent} from "../common/MeetingDrawerComponent";
import {JoinButton} from "../common/JoinButton";


class SearchMeetingComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible : false
        }

        this.avatar = this.avatar.bind(this)
        this.showDrawer = this.showDrawer.bind(this)
        this.onClose = this.onClose.bind(this)
    }

    avatar(platform) {
        return <Avatar style={{ color: '#E7F1FD', backgroundColor: platform_color(platform), fontSize:"x-large"}}>{platform_name(platform).charAt(0)}</Avatar>
    }

    showDrawer() {
        this.setState({
            visible : true
        })
    }

    onClose() {
        this.setState({
            visible : false
        })
    }


    render() {
        const {meeting} = this.props;
        const {visible} = this.state
        return (
            <div>
                <List.Item
                    actions={[
                        <JoinButton meeting={meeting}/>,
                        <Button icon={<MoreOutlined />} onClick={this.showDrawer}/>

                    ]}
                >
                    <Skeleton loading={false}>
                        <List.Item.Meta
                            avatar={this.avatar(meeting.platform)}
                            title={meeting.title}
                            description={format(new Date(meeting.start_time), 'PPP')}
                        />
                        {meeting.start_time.toLocaleTimeString([], {hour12:true, hour:'2-digit', minute:'2-digit'})} - {meeting.end_time.toLocaleTimeString([], {hour12:true, hour:'2-digit', minute:'2-digit'})}
                    </Skeleton>
                </List.Item>
                <MeetingDrawerComponent visible={visible} meeting={meeting} onClose={() => this.onClose()}/>
            </div>

        )
    }
}

function mapState(state) {
    return {}
}

const actionCreators = {}

const connectedComponent = connect(mapState, actionCreators)( SearchMeetingComponent);
export { connectedComponent as SearchMeetingComponent };
