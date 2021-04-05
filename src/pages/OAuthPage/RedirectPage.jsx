import React from "react";
import {connect} from "react-redux";
import {oauthActions} from "../../actions/oauth.actions";
import {Row, Spin} from "antd";

class RedirectPage extends React.Component {

    constructor(props) {
        super(props);

        const query = new URLSearchParams(this.props.location.search);
        const platform = this.props.location.pathname.replace("/redirect/", "")
        this.props.access(platform, query.get('state'), query.get('code'))
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

const connectedPage = connect(mapState, actionCreators)(RedirectPage);
export { connectedPage as RedirectPage };
