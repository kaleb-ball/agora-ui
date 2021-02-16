import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import {Button, Card, Col, Form, Input, Row} from 'antd'
import {history} from "../../helpers";


class LoginPage extends React.Component {

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
            <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                <Col span={8} style={{maxWidth: '400px'}}>
                    <Form size="large" onFinish={this.handleSubmit}>
                        <Form.Item
                            label="Username"
                            rules={[{ required: true, message: 'Enter your username' }]}
                        >
                            <Input name="username" onChange={this.handleChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            rules={[{ required: true, message: 'Enter your password' }]}
                        >
                            <Input.Password name="password" onChange={this.handleChange}  visibilityToggle/>
                        </Form.Item>
                        <Form.Item style={{float: 'right'}}>
                            <Button to="/register" type="ghost" htmlType="button" style={{margin: '8px'}}
                                    onClick={() => {
                                        history.push('/register')
                                    }}>
                                Register
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                </Col>
            </Row>
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

const connectedLoginPage = connect(mapState, actionCreators)( LoginPage);
export { connectedLoginPage as LoginPage };

/*class LoginPage extends React.Component {


    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            username : '',
            password : '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this)
        //this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        const {name, value } = e.target
        this.setState({[name] : value})
    }

     handleSubmit  = e => {
        //e.preventDefault();
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
        return(
            <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                <Col span={8} style={{maxWidth : '400px'}}>
                    <Form size="large" onFinish={this.handleSubmit}>
                        <Form.Item label="Username">
                            <Input onChange={this.handleChange}/>
                        </Form.Item>
                        <Form.Item label="Password">
                            <Input.Password visibilityToggle />
                        </Form.Item>
                        <Form.Item style={{float: 'right'}}>
                            <Button to="/register" type="ghost" htmlType="button" style={{margin: '8px'}}
                            onClick={()=> {history.push('/register')}}>
                                Register
                            </Button>
                            <Button type="primary" htmlType="submit" >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                </Col>
            </Row>
           /!* <div className="col-md-6 col-md-ofset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? 'has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange}/>
                        {submitted && !username &&
                            <div className="help-block">Username is Required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? 'has-error' : '')}>
                        <label htmlFor="Password">Password</label>
                        <input type="text" className="form-control" name="password" value={password} onChange={this.handleChange}/>
                        {submitted && !password &&
                        <div className="help-block">Password is Required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>*!/
        )
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)( LoginPage);
export { connectedLoginPage as LoginPage };*/
