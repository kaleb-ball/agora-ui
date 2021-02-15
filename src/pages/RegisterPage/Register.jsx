import React from "react";
import {connect} from "react-redux";
import {userActions} from "../../_actions";
import {Link} from "react-router-dom";
import {Form} from "react-bootstrap";

class RegisterPage extends React.Component {

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
        e.preventDefault();

        this.setState({submitted : true})
        const { user } = this.state;
        if(user.firstname && user.lastname && user.username && user.password) {
            this.props.register(user);
        }
    }
    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (<div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstname ? ' has-error' : '')}>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" className="form-control" name="firstname" value={user.firstname} onChange={this.handleChange} />
                        {submitted && !user.firstname &&
                        <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastname ? ' has-error' : '')}>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" className="form-control" name="lastname" value={user.lastname} onChange={this.handleChange} />
                        {submitted && !user.lastname &&
                        <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }



}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };