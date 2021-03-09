import {Row} from "antd";
import {oauthActions} from "../../actions/oauth.actions";
import {connect} from "react-redux";
import * as React from "react";
import {CreateMeetingComponent} from "../../components/createMeeting/CreateMeetingComponent";

class  HomePage extends React.Component {

    render() {
        return(
            <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                <CreateMeetingComponent />
            </Row>
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