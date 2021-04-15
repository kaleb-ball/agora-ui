import {Button, Col, DatePicker, Divider, Mentions, Radio, Row, Space} from "antd";
import {oauthActions} from "../../actions/oauth.actions";
import {connect} from "react-redux";
import * as React from "react";
import {meetingActions} from "../../actions";
import Search from "antd/es/input/Search";
import {SelectPlatformComponent} from "../../components/platform/SelectPlatformComponent";
import { isFuture, isPast, isBefore, isAfter } from 'date-fns'

const { RangePicker } = DatePicker

class MeetingsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            platform : '',
            startDate: '',
            endDate: '',
            dateType : '',
            timePeriod : '',
            search : ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleDataChange = this.handleDataChange.bind(this)
        this.disabledDate = this.disabledDate.bind(this)
    }

    datePicker() {
        if (this.state.dateType === 'day') {
            return <DatePicker disabledDate={this.disabledDate}/>
        } else if (this.state.dateType === 'range') {
            return <RangePicker disabledDate={this.disabledDate}/>
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
        const {platform, startDate, endDate, search} = this.state
        if (platform) meetings = meetings.filter(meeting => meeting.platform === platform)
        if (startDate) meetings = meetings.filter(meeting => isAfter(meeting.date, startDate))
        if (endDate) meetings = meetings.filter(meeting => isBefore(meeting.date, endDate))
        if (search) meetings = meetings.filter(meeting => meeting.title.includes(search) || meeting.description.includes(search))
        return meetings
    }

    render() {
        const datePicker = this.datePicker()
        let {meetings} = this.props
        meetings = this.filter(meetings)
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
                        <Radio.Group name="dateType" onChange={this.handleChange}>
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
            </div>
        )
    }
}

function mapState(state) {
    return {}
}

const actionCreators = {
    authorization : oauthActions.getAuthorization,
    getMeetings : meetingActions.getMeetings
}

const connectedPage = connect(mapState, actionCreators)(MeetingsPage);
export { connectedPage as MeetingsPage };