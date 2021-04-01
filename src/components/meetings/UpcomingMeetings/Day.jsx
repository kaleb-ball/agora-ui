import React from "react";
import {connect} from "react-redux";
import {Button, Card, Divider, List, Popconfirm, Skeleton} from "antd";
import Avatar from "antd/es/avatar/avatar";
import { dateHelper } from "../../../helpers"
import {meetingActions} from "../../../actions";
import './Day.css'
import {ExclamationCircleTwoTone, MoreOutlined} from "@ant-design/icons";


class UpcomingMeetingComponent extends React.Component {
    constructor(props) {
        super(props);

        this.startMeeting = this.startMeeting.bind(this)
    }

    startMeeting(id) {
        if (id) this.props.startMeeting(id);
    }


    render() {
        const {date, meetings, loading} = this.props;
        return (
        <div className="day-container">
            <Divider orientation="center">{dateHelper.getDayOfWeek(date)}, {dateHelper.getMonthOfYear(date)} {date.getDate()}, {date.getFullYear()}</Divider>
            <Card>
                <List
                    itemLayout="vertical"
                    dataSource={meetings}
                    loading={loading}
                    locale={{emptyText : "No Meetings"}}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Button onClick={() => this.startMeeting(item.id)} type="primary" ghost>Start</Button>,
                                <Popconfirm title="Are You Sure？" okText="Yes" okType="danger" cancelText="No" icon={<ExclamationCircleTwoTone twoToneColor="#f5222d"/>}>
                                    <Button type="danger" ghost>Delete</Button>
                                </Popconfirm>,
                                <Button icon={<MoreOutlined />}/>

                            ]}
                        >
                            <Skeleton loading={false}>
                                <List.Item.Meta
                                    avatar={<Avatar style={{ color: '#E7F1FD', backgroundColor: '#2681F2' }}>Zoom</Avatar>}
                                    title={item.title}
                                    description={item.description}
                                />
                                {item.start_time.toLocaleTimeString([], {hour12:true, hour:'2-digit', minute:'2-digit'})} - {item.end_time.toLocaleTimeString([], {hour12:true, hour:'2-digit', minute:'2-digit'})}
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Card>
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

const connectedComponent = connect(mapState, actionCreators)( UpcomingMeetingComponent);
export { connectedComponent as DayComponent };
