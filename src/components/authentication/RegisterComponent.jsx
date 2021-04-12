import React from "react";
import {connect} from "react-redux";
import {userActions} from "../../actions";
import {Button, Form, Input} from "antd";

class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user : {
                firstname : '',
                lastname : '',
                username: '',
                password: ''
            },
            submitted : false
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.createRegisterForm = React.createRef()

    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user : {
                ...user,
                [name] : value
            }
        })
    }

    handleSubmit(e) {
        this.setState({submitted : true})
        const { user } = this.state;
        if(user.firstname && user.lastname && user.username && user.password) {
            this.props.register(user);
            this.props.switchTab()
            this.createRegisterForm.current.resetFields();
        } else {
            return false
        }
    }
    render() {
        return (
            <Form ref={this.createRegisterForm} size="large" onFinish={this.handleSubmit}>
                <Form.Item
                    label="First Name"
                    name="firstname"
                    rules={[{ required: true, message: 'Enter your first name' }]}
                >
                    <Input name="firstname" onChange={this.handleChange}/>
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastname"
                    rules={[{ required: true, message: 'Enter your last name' }]}
                >
                    <Input name="lastname" onChange={this.handleChange}/>
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Enter your username' }]}
                >
                    <Input name="username" onChange={this.handleChange}/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    rules={[{ required: true, message: 'Enter your password' }]}
                    name="password"
                >
                    <Input.Password name="password" onChange={this.handleChange}  visibilityToggle/>
                </Form.Item>
                <Form.Item style={{float: 'right'}}>
                    <Button type="ghost" htmlType="button" style={{margin: '8px'}}
                            onClick={() => {
                                this.props.switchTab()
                            }}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }



}


const actionCreators = {
    register: userActions.register
}

const connectedPage = connect(null, actionCreators)(RegisterComponent);
export { connectedPage as RegisterComponent };