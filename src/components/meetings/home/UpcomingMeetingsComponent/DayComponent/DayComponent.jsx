import React from "react";
import {connect} from "react-redux";
import {Card, Divider, List} from "antd";
import { dateHelper } from "../../../../../helpers"
import './DayComponent.css'
import {MeetingComponent} from "../MeetingComponent";

/**
 * A component which lists a day and shows all the meetings for that day
 *
 * Props:
 * date - the date to display
 * meetings - a list of meetings to filter
 * loading - whether or not the meetings have been retrieved yet
 */
class UpcomingMeetingComponent extends React.Component {
    constructor(props) {
        super(props);
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
}

const connectedComponent = connect(mapState, actionCreators)( UpcomingMeetingComponent);
export { connectedComponent as DayComponent };
