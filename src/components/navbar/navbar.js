import './navbar.less'
import {Button, Menu} from "antd";
import * as React from "react";
import {Header} from "antd/es/layout/layout";

class Navbar extends React.Component {
    render() {
        return(
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff' }}>
                <div className="logo" />
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
        );
    };

}

export default Navbar;