import {Row, Space} from "antd";
import {oauthActions} from "../../actions/oauth.actions";
import {connect} from "react-redux";
import * as React from "react";
import {CreateMeetingComponent} from "../../components/createMeeting/CreateMeetingComponent";
import {CreateInstantMeetingComponent} from "../../components/createMeeting/CreateInstantMeetingComponent";

class  HomePage extends React.Component {

    render() {
        return(
            <div>
                <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                    <Space direction="vertical" align="center">
                        <CreateMeetingComponent />
                        <CreateInstantMeetingComponent />
                    </Space>
                </Row>
            </div>

        )
    }

}

function mapState(state) {
    return {}
}

const actionCreators = {
    authorization : oauthActions.getAuthorization
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };