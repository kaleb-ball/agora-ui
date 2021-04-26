import React from "react";
import {connect} from "react-redux";
import {Button, List, Skeleton} from "antd";
import Avatar from "antd/es/avatar/avatar";
import './DayComponent/DayComponent.css'
import {MoreOutlined} from "@ant-design/icons";
import {platform_color, platform_name} from "../../../../constants/platformConstants";
import {MeetingDrawerComponent} from "../../common/MeetingDrawerComponent";
import {JoinButton} from "../../common/JoinButton";

/**
 * An individual meeting
 *
 * Props:
 * meeting - the meeting information
 */
class MeetingComponent extends React.Component {
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
                            description={meeting.description}
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

const connectedComponent = connect(mapState, actionCreators)( MeetingComponent);
export { connectedComponent as MeetingComponent };
