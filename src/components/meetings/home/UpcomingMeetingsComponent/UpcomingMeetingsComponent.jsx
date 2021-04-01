import React from 'react';
import { connect } from 'react-redux';

import {Button, Card} from 'antd'
import { Tabs } from 'antd';
import {DayComponent} from "../../common/DayComponent/DayComponent";
import {meetingActions} from "../../../../actions";
import { add, addDays, isPast } from 'date-fns'
import {ReloadOutlined} from "@ant-design/icons";

const { TabPane } = Tabs;

class UpcomingMeetingComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            key: '1'
        };

        this.onChange = this.onChange.bind(this)
        this.switchTab = this.switchTab.bind(this)

        this.props.getMeetings()

    }

    switchTab() {
        this.setState({key : 'login'})
    }

    onChange(key) {
        this.setState({ key : key });
    }

    addDatesToMeetings(meetings) {
         meetings.forEach(meeting => {
            meeting.start_time = new Date(meeting.start_time)
            meeting.end_time = add(new Date(meeting.start_time), {minutes:meeting.duration})
        })
    }

    filterMeetingsByDate(meetings, date) {
        return meetings.filter(
            (meeting) => {
                return meeting.start_time.getMonth() === date.getMonth() &&
                    meeting.start_time.getDate() === date.getDate() &&
                    meeting.start_time.getFullYear() === date.getFullYear();
            })
    }

    filterTodayMeetings(meetings) {
        return this.filterMeetingsByDate(meetings, new Date()).filter(
            (meeting) => {
                return !isPast(meeting.end_time)
            }
        )
    }

    reload() {
        console.log("reload")
        this.props.getMeetings();
    }

    render() {
        let meetings = this.props.meetings;
        let loading = this.props.requesting;
        if (meetings !== undefined && meetings.length > 0) this.addDatesToMeetings(meetings)
        return (
            <Card style={{marginTop : "50px"}}>
                <Button size="small" icon={<ReloadOutlined />} style={{float:"right"}} onClick={()=>this.reload()}/>
                <Tabs activeKey={this.state.key} onChange={this.onChange}>
                    <TabPane tab="Today" key="1">
                        <DayComponent date={new Date()}
                                      loading={loading}
                                      meetings={meetings !== undefined ? this.filterTodayMeetings(meetings) : []}
                        />
                    </TabPane>
                    <TabPane tab="Tomorrow" key="2">
                        <DayComponent date={addDays(new Date(),1)}
                                      loading={loading}
                                      meetings={meetings !== undefined ? this.filterMeetingsByDate(meetings, addDays(new Date(), 1)) : []}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        )
    }
}

function mapState(state) {
    return {
        requesting : state.getMeetings.requestingMeetings,
        meetings : state.getMeetings.meetings
    }
}

const actionCreators =  {
    getMeetings : meetingActions.getMeetings
}

const connectedComponent = connect(mapState, actionCreators)( UpcomingMeetingComponent);
export { connectedComponent as UpcomingMeetingComponent };