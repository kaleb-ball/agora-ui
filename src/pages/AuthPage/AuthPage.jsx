import React from 'react';
import { connect } from 'react-redux';

import {Card, Col, Row} from 'antd'
import {LoginComponent, RegisterComponent} from "../../components/authentication";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class AuthPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            key: 'login'
        };

    }
    render() {
        return (
            <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                <Col span={8} style={{maxWidth: '400px', height: "400px"}}>
                    <Card>
                        <Tabs>
                            <TabPane tab="Login" key="login">
                                <LoginComponent/>
                            </TabPane>
                            <TabPane tab="Register" key="register">
                                <RegisterComponent switchTab = {this.activeTab = 'login'}/>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        )
    }
}

function mapState(state) {
    return {
        registered : state.registered
    }
}

const connectedPage = connect(mapState, null)( AuthPage);
export { connectedPage as AuthPage };