import React from "react";
import {connect} from "react-redux";
import {oauthActions} from "../../actions/oauth.actions";
import {Row, Spin} from "antd";
import {platformConstants} from "../../constants/platformConstants";

class ZoomRedirectPage extends React.Component {

    constructor(props) {
        super(props);

        const query = new URLSearchParams(this.props.location.search);
        this.props.access(platformConstants.PLATFORM_NAMES.ZOOM, query.get('state'), query.get('code'))
    }

    componentDidMount() {
        document.title = "Redirecting..."
    }

    componentWillUnmount() {
        document.title = "Agora"
    }

    render() {
        return(
            <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                <Spin size="large"/>
            </Row>
        )
    }

}

function mapState(state) {
    return {}
}

const actionCreators = {
    access : oauthActions.getAccessToken
}

const connectedRedirectPage = connect(mapState, actionCreators)(ZoomRedirectPage);
export { connectedRedirectPage as ZoomRedirectPage };