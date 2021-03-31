import {Col, Row, Space} from "antd";
import {oauthActions} from "../../actions/oauth.actions";
import {connect} from "react-redux";
import * as React from "react";
import {CreateMeetingComponent} from "../../components/meetings/CreateMeeting/CreateMeetingComponent";
import {CreateInstantMeetingComponent} from "../../components/meetings/CreateMeeting/CreateInstantMeetingComponent";
import {UpcomingMeetingComponent} from "../../components/meetings/UpcomingMeetings/UpcomingMeetings";
import {meetingActions} from "../../actions";

class  HomePage extends React.Component {

    render() {
        return(
            <div>
                <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                    <Col span={8}>
                        <Space direction="vertical" align="center" size="large">
                            <CreateMeetingComponent />
                            <CreateInstantMeetingComponent />
                        </Space>
                    </Col>
                    <Col span={8}>
                        <UpcomingMeetingComponent />
                    </Col>
                </Row>
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

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };