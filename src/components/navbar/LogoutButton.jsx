import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import {Button} from 'antd'


class LogoutButton extends React.Component {

    constructor(props) {
        super(props);
    }

    logout() {
        this.props.logout()
    }

    render() {
        const loggedIn = this.props.loggedIn
        if (loggedIn) {
            return (

                <Button
                    ghost={true}
                    type="primary"
                    onClick={()=>this.logout()}
                    style={{position : "absolute", bottom : 15}}>
                    Sign Out
                </Button>
            )
        } else {
            return null
        }

    }
}

function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}

const actionCreators = {
    logout: userActions.logout
};

const connectedLogoutButton = connect(mapState, actionCreators)( LogoutButton);
export { connectedLogoutButton as LogoutButton };