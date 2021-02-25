import React from 'react';
import { connect } from 'react-redux';

import {Card, Col, Row} from 'antd'
import {LoginComponent, RegisterComponent} from "../../components/authentication";

const tabList = [
    {
        key: 'login',
        tab: 'Login',
    },
    {
        key: 'register',
        tab: 'Register',
    },
];

const contentList = {
    login: <LoginComponent/>,
    register: <RegisterComponent/>
};

class AuthPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            key: 'login',
        };

    }

     onTabChange(key, type) {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        return (
            <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                <Col span={8} style={{maxWidth: '400px', height: "400px"}}>
                    <Card

                        style={{ width: '100%' }}
                        tabList={tabList}
                        activeTabKey={this.state.key}
                        onTabChange={key => {
                            this.onTabChange(key, 'key');
                        }}
                    >
                        {contentList[this.state.key]}
                    </Card>
                </Col>
            </Row>
        )
    }
};

function mapState(state) {
}

const actionCreators = {
};

const connectedPage = connect(mapState, actionCreators)( AuthPage);
export { connectedPage as AuthPage };