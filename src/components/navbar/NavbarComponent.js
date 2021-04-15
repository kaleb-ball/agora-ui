import './navbar.less'
import {Menu} from "antd";
import * as React from "react";
import {Header} from "antd/es/layout/layout";
import {LogoutButton} from "./LogoutButton";
import {connect} from "react-redux";

class NavbarComponent extends React.Component {

    menu() {
        const loggedIn = this.props.loggedIn
        if (loggedIn) {
            return (
                <Menu theme="light" mode="horizontal" style={{ lineHeight: '64px' }}>
                    <Menu.Item key="1"><a href="/">Home</a></Menu.Item>
                    <Menu.Item key="2"><a href="/meetings">Meetings</a></Menu.Item>
                    <Menu.Item key="3"><a href="/">Account</a></Menu.Item>
                </Menu>
            )
        } else {
            return (
                <Menu theme="light" mode="horizontal" style={{ lineHeight: '64px' }} />
            )
        }
    }

    render() {
        const menu = this.menu()
        return(
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff' }}>
                <div className="logo">
                    <a href="/">Agora</a>
                </div>
                {menu}
                <div style={{float: "right", paddingRight : 150}}>
                    <LogoutButton/>
                </div>
            </Header>
        );
    };

}

function mapState(state) {
        const { loggedIn } = state.authentication;
        return { loggedIn };
    }

const actionCreators = {};

const connectedComponent = connect(mapState, actionCreators)( NavbarComponent);
export { connectedComponent as NavbarComponent};