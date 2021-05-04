import React from 'react';
import { connect } from 'react-redux';

import {Button, Form, Input, Modal} from 'antd'
import {meetingActions} from "../../../../actions";
import {SelectPlatformComponent} from "../../../platform/SelectPlatformComponent";

/**
 * Creates an instant meeting with optional title and description fields.
 *
 * Props:
 * createInstantMeeting {function} - meetingAction which creates an instant meeting and sends the user to it
 */
class CreateInstantMeetingComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible : false,
            submitted : false,
            platform : '',
            title : '',
            description : '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleDataChange = this.handleDataChange.bind(this)
        this.show = this.show.bind(this)
        this.createInstantMeetingFormRef = React.createRef()

    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({[name] : value})
    }

    handleDataChange(name, data) {
        this.setState({
            [name] : data
        })
    }


    handleSubmit(){
        this.setState({submitted : true});
        const {title, description, platform} = this.state;

        if (platform) {
            let data = {
                title : title,
                description : description,
            }
            this.props.createInstantMeeting(data, platform)
            this.handleCancel();
        } else {
            return false;
        }


    }

    handleCancel() {
        this.setState({
            visible : false,
            title : '',
            description : '',
        })
        this.createInstantMeetingFormRef.current.resetFields();
    }


    show() {
        this.setState({
            visible : true
        })
    }


    render() {
        const {visible} = this.state;
        return (
            <div>
                <Button type="primary" onClick={() => this.show()}>
                    Start Meeting
                </Button>
                <Modal title="Create Meeting" visible={visible} okText="Create" onCancel={() => this.handleCancel()}
                       footer={[
                           <Button key="cancel" onClick={() => {
                               this.handleCancel();
                           }}>
                               Cancel
                           </Button>,
                           <Button type="primary" form="instantForm" key="submitCreateMeeting" htmlType="submit">
                               Create
                           </Button>
                       ]}
                >
                    <Form ref={this.createInstantMeetingFormRef} id="instantForm" size="large" onFinish={() => this.handleSubmit()} >
                        <Form.Item
                            label="Platform"
                            name="platform"
                        >
                            <SelectPlatformComponent onSelect={this.handleDataChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Title"
                            name="title"
                        >
                            <Input name="title" onChange={this.handleChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                        >
                            <Input name="description" onChange={this.handleChange}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        )
    }
}

function mapState(state) {
    return {}
}

const actionCreators = {
    createInstantMeeting : meetingActions.createInstantMeeting
};

const connectedInstantMeetingComponent = connect(mapState, actionCreators)(CreateInstantMeetingComponent);
export { connectedInstantMeetingComponent as CreateInstantMeetingComponent };