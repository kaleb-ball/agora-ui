import React from 'react';
import { connect } from 'react-redux';

import {Button, Form, Input, Modal} from 'antd'
import {meetingActions} from "../../actions";
class CreateInstantMeetingComponent extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            visible : false,
            submitted : false,
            title : '',
            description : '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.show = this.show.bind(this)
        this.createInstantMeetingFormRef = React.createRef()

    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({[name] : value})
    }


    handleSubmit(){
        this.setState({submitted : true});
        const {title, description} = this.state;

        let data = {
            title : title,
            description : description,
        }
        this.props.createInstantMeeting(data)
        this.handleCancel();

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
        const visible = this.state.visible;
        return (
            <div>
                <Button type="primary" onClick={() => this.show()}>
                    Create Instant Meeting
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