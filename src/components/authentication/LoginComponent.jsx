import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import {Button, Form, Input} from 'antd'


class LoginComponent extends React.Component {

    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            username : '',
            password : '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        console.log("Change")
        const {name, value } = e.target
        this.setState({[name] : value})
    }

    handleSubmit(e){
        console.log("Submit")
        this.setState({submitted : true});
        const {username, password} = this.state;
        if (username && password) {
            this.props.login(username, password)
        } else {
            return false
        }

    }
    render() {
        const {loggingIn} = this.props;
        const{username, password, submitted} = this.state;
        return (
            <Form size="large" onFinish={this.handleSubmit}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Enter your username' }]}
                >
                    <Input name="username" onChange={this.handleChange}/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Enter your password' }]}
                >
                    <Input.Password name="password" onChange={this.handleChange}  visibilityToggle/>
                </Form.Item>
                <Form.Item style={{float: 'right'}}>
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
};

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)( LoginComponent);
export { connectedLoginPage as LoginComponent };