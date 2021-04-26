import React from 'react';
import { connect } from 'react-redux';

import {Button, Card} from 'antd'
import { Tabs } from 'antd';
import {DayComponent} from "./DayComponent/DayComponent";
import {meetingActions} from "../../../../actions";
import { addDays } from 'date-fns'
import {ReloadOutlined} from "@ant-design/icons";
import {get_authenticated_platforms} from "../../../../constants/platformConstants";
import {filterMeetingsByDate, filterTodayMeetings} from "../../../../helpers/meetings-util";

const { TabPane } = Tabs;

/**
 * A widget which displays today's and tomorrow's meetings
 *
 * Props:
 * getMeetings {function} - meetingAction function which retrieves all meetings for a user
 * meetings - the meetings in the global state
 * loading - whether or not the meetings have been retrieved
 */
class UpcomingMeetingComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            key: '1',
            authenticatedPlatforms : get_authenticated_platforms()
        };

        this.onChange = this.onChange.bind(this)
        this.switchTab = this.switchTab.bind(this)

        this.props.getMeetings(this.state.authenticatedPlatforms)

    }

    switchTab() {
        this.setState({key : 'login'})
    }

    onChange(key) {
        this.setState({ key : key });
    }

    reload() {
        this.props.getMeetings(this.state.authenticatedPlatforms);
    }

    render() {
        let meetings = this.props.meetings;
        let loading = this.props.requesting;
        if (meetings && meetings.length > 0) {
            meetings = meetings.filter(x=>x!== null)
            meetings.sort((a,b)=>a.start_time.getTime()-b.start_time.getTime());
        }
        return (
            <Card style={{marginTop : "50px"}}>
                <Button size="small" icon={<ReloadOutlined />} style={{float:"right"}} onClick={()=>this.reload()}/>
                <Tabs activeKey={this.state.key} onChange={this.onChange}>
                    <TabPane tab="Today" key="1">
                        <DayComponent date={new Date()}
                                      loading={loading}
                                      meetings={meetings !== undefined ? filterTodayMeetings(meetings) : []}
                        />
                    </TabPane>
                    <TabPane tab="Tomorrow" key="2">
                        <DayComponent date={addDays(new Date(),1)}
                                      loading={loading}
                                      meetings={meetings !== undefined ? filterMeetingsByDate(meetings, addDays(new Date(), 1)) : []}
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