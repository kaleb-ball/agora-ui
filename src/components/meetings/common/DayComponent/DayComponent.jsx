import React from "react";
import {connect} from "react-redux";
import {Card, Divider, List} from "antd";
import { dateHelper } from "../../../../helpers"
import {meetingActions} from "../../../../actions";
import './DayComponent.css'
import {MeetingComponent} from "../MeetingComponent";


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
                    renderItem={meeting => (
                        <MeetingComponent meeting={meeting}/>
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
