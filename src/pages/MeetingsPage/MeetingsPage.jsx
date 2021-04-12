import {Col, DatePicker, Divider, Mentions, Radio, Row, Space} from "antd";
import {oauthActions} from "../../actions/oauth.actions";
import {connect} from "react-redux";
import * as React from "react";
import {meetingActions} from "../../actions";
import Search from "antd/es/input/Search";
import {SelectPlatformComponent} from "../../components/platform/SelectPlatformComponent";

class MeetingsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            platform : '',
            startDate: '',
            endDate: '',
        }
    }


    render() {
        return(
            <div>
                    <Row type="flex" justify="center" style={{paddingTop: '100px'}}>
                        <Space direction="horizontal" size="large">
                            <SelectPlatformComponent onSelect={() => console.log("Select")}/>
                            <Radio.Group>
                                <Radio.Button value="all">All</Radio.Button>
                                <Radio.Button value="upcoming">Upcoming</Radio.Button>
                                <Radio.Button value="previous">Previous</Radio.Button>

                            </Radio.Group>
                            <Radio.Group>
                                <Radio.Button value="day">Day</Radio.Button>
                                <Radio.Button value="week">Week</Radio.Button>
                                <Radio.Button value="range">Range</Radio.Button>
                            </Radio.Group>
                            <DatePicker />
                        </Space>
                    </Row>
                    <Row type="flex" justify="center" style={{paddingTop: '25px'}}>
                        <Space direction="horizontal" size="large">
                            <Search placeholder="Search Text" />
                            <Mentions placeholder="Search Participants"/>
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