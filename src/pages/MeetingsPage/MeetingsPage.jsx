import {Button, Card, Col, Collapse, DatePicker, Divider, Mentions, Radio, Row, Space} from "antd";
import {oauthActions} from "../../actions/oauth.actions";
import {connect} from "react-redux";
import * as React from "react";
import {meetingActions} from "../../actions";
import Search from "antd/es/input/Search";
import {SelectPlatformComponent} from "../../components/platform/SelectPlatformComponent";
import { isFuture, isPast, isBefore, isAfter } from 'date-fns'
import {filterMeetingsByDate, filterMeetingsByDateRange, removeTime} from "../../helpers/meetings-util";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import {get_authenticated_platforms} from "../../constants/platformConstants";
import {SearchMeetingsList} from "../../components/meetings/search/SearchMeeetingsList";

const { RangePicker } = DatePicker

class Panel extends React.Component {
    render() {
        return null;
    }
}

class MeetingsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticatedPlatforms : get_authenticated_platforms(),
            platform : '',
            date : '',
            startDate: '',
            endDate: '',
            dateType : '',
            timePeriod : '',
            search : ''
        }

        this.props.getMeetings(this.state.authenticatedPlatforms)

        this.handleChange = this.handleChange.bind(this)
        this.handleDataChange = this.handleDataChange.bind(this)
        this.disabledDate = this.disabledDate.bind(this)
    }

    datePicker() {
        if (this.state.dateType === 'day') {
            return <DatePicker onChange={(date, dateString)=> {this.handleDataChange("date", date)}} disabledDate={this.disabledDate}/>
        } else if (this.state.dateType === 'range') {
            return <RangePicker onChange={(dates, dateStrings)=> {
                if (dates) {
                    this.handleDataChange("startDate", dates[0])
                    this.handleDataChange("endDate", dates[1])
                } else {
                    this.handleDataChange("startDate", '')
                    this.handleDataChange("endDate", '')
                }

            }} disabledDate={this.disabledDate}/>
        }
    }

    handleDataChange(name, data) {
        this.setState({
            [name] : data
        })
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({[name] : value})
    }

    disabledDate(now) {
        if (this.state.timePeriod === 'previous') {
            return isFuture(new Date(now))
        } else if (this.state.timePeriod === 'upcoming') {
            return isPast(new Date(now))
        }
    }

    filter(meetings) {
        const {platform, startDate, endDate, date, search} = this.state
        if (!meetings) return meetings
        if (platform && platform !== 'all') meetings = meetings.filter(meeting => meeting.platform === platform)
        if (date) meetings = filterMeetingsByDate(meetings, new Date(date))
        if (startDate && endDate) meetings = filterMeetingsByDateRange(meetings, removeTime(startDate), removeTime(endDate))
        if (search) meetings = meetings.filter(meeting => meeting.title.includes(search) || meeting.description.includes(search))
        return meetings
    }

    render() {
        const datePicker = this.datePicker()
        let { meetings, requesting } = this.props
        meetings = this.filter(meetings)
        console.log(meetings)
        return(
            <div>
                <Row type="flex" justify="center" style={{paddingTop: '100px'}}>
                    <Space direction="horizontal" size="large">
                        <SelectPlatformComponent showAll={true} onSelect={this.handleDataChange}/>
                        <Radio.Group name="timePeriod" onChange={this.handleChange}>
                            <Radio.Button value="all">All</Radio.Button>
                            <Radio.Button value="upcoming">Upcoming</Radio.Button>
                            <Radio.Button value="previous">Previous</Radio.Button>
                        </Radio.Group>
                        <Radio.Group name="dateType" onChange={
                            (e) => {
                                this.handleChange(e)
                                this.handleDataChange('date', '')
                                this.handleDataChange("startDate", '')
                                this.handleDataChange('endDate', '')
                            }
                        }>
                            <Radio.Button value="day">Day</Radio.Button>
                            <Radio.Button value="range">Range</Radio.Button>
                        </Radio.Group>
                        {datePicker}
                    </Space>
                </Row>
                <Row type="flex" justify="center" style={{paddingTop: '25px'}}>
                    <Space direction="horizontal" size="large">
                        <Radio.Group name="host">
                            <Radio.Button value="host">Host</Radio.Button>
                            <Radio.Button value="participant">Participant</Radio.Button>
                            <Radio.Button value="all">All</Radio.Button>
                        </Radio.Group>
                        <Mentions placeholder="Search Participants"/>
                    </Space>
                </Row>
                <Row type="flex" justify="center" style={{paddingTop: '25px'}}>
                    <Space direction="horizontal" size="large">
                        <Search name='search' onChange={this.handleChange} placeholder="Search Text"/>
                    </Space>
                </Row>
                <Divider />
                <Row type="flex" justify="center" style={{paddingTop: '25px'}}>
                    <Col>
                        <SearchMeetingsList loading={requesting} meetings={meetings}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapState(state) {
    return {
        requesting : state.getMeetings.requestingMeetings,
        meetings : state.getMeetings.meetings
    }
}

const actionCreators = {
    getMeetings : meetingActions.getMeetings
}

const connectedPage = connect(mapState, actionCreators)(MeetingsPage);
export { connectedPage as MeetingsPage };