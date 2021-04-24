import React from 'react';
import { connect } from 'react-redux';

import {Button, Col, DatePicker, Form, Input, InputNumber, Modal, Radio, Row, TimePicker} from 'antd'
import {meetingActions} from "../../../../actions";
import { isPast, isToday } from 'date-fns';
import {SelectPlatformComponent} from "../../../platform/SelectPlatformComponent";
import {get_authenticated_platforms, get_id_by_value} from "../../../../constants/platformConstants";
import {ParticipantList} from "../../common/ParticipantList";
import {get_user_id} from "../../../../constants";

class CreateMeetingComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible : false,
            submitted : false,
            platform : '',
            title : '',
            description : '',
            date : '',
            time : '',
            length : '',
            unit : '',
            participants : [],
            authenticatedPlatforms : get_authenticated_platforms()
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleDataChange = this.handleDataChange.bind(this)
        this.show = this.show.bind(this)
        this.setParticipants = this.setParticipants.bind(this)
        this.createMeetingFormRef = React.createRef()

    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({[name] : value})
    }

    handleCreate(){
        this.setState({submitted : true});
        const {platform, title, description, date, time, length, unit} = this.state;

        if (platform && title && description && date && time &&  length && unit) {

            let data = {
                title : title,
                description : description,
                start_time : new Date(date + ' ' + time).toISOString(),
                duration : length + unit
            }
            this.props.createMeeting(data, platform, this.createInvites())
            this.handleCancel();
            setTimeout(()=> {
                this.props.getMeetings(this.state.authenticatedPlatforms)
            },1000);
        } else {
            return false;
        }

    }

    createInvites() {
        let invites = [];
        const {participants, platform} = this.state
        if (participants.length > 0) {
            participants.forEach(
                participant => {
                    let invite = {}
                    invite.meeting_platform_id = get_id_by_value(platform)
                    invite.inviter_id = get_user_id()
                    invite.invitee_username = participant
                    invites.push(invite)
            })
        }
        return invites
    }

    handleCancel() {
        this.setState({
            visible : false,
            title : '',
            description : '',
            date : '',
            time : '',
            length : '',
            unit : '',
            participants : [],
        })
        this.createMeetingFormRef.current.resetFields();
    }

    handleDataChange(name, data) {
        this.setState({
            [name] : data
        })
    }

    show() {
        this.setState({
            visible : true
        })
    }

    validateToday() {
        const {date, time} = this.state
        if (date && time) {
            return !isPast(new Date(date + ' ' + time));
        }
        return false;
    }

    setParticipants(participants) {
        this.setState({
            participants : participants
        })
    }

    render() {
        const {visible} = this.state;
        return (
            <div>
                <Button type="primary" onClick={() => this.show()}>
                    Create Meeting
                </Button>
                <Modal title="Create Meeting" visible={visible} okText="Create" onCancel={() => this.handleCancel()}
                       footer={[
                           <Button key="cancel" onClick={() => { this.handleCancel(); }}> Cancel </Button>,
                           <Button type="primary" form="meetingForm" key="submit" htmlType="submit"> Create</Button>
                       ]}
                >
                    <Form ref={this.createMeetingFormRef} id="meetingForm" size="large" onFinish={() => this.handleCreate()} labelAlign="right" >
                        <Form.Item
                            label="Platform"
                            name="platform"
                        >
                            <SelectPlatformComponent onSelect={this.handleDataChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Enter a title' }]}
                        >
                            <Input name="title" onChange={this.handleChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Enter a description' }]}
                        >
                            <Input name="description" onChange={this.handleChange}/>
                        </Form.Item>
                        <Row gutter={16}>
                            <Col className="gutter-row">
                                <Form.Item
                                    label="Date"
                                    name="date"
                                    rules={[
                                        { required: true, message: 'Enter a date' },
                                        {validator : (_, value)=>
                                            !isPast(new Date(value)) || isToday(new Date(value)) ? Promise.resolve() : Promise.reject(new Error('Enter a valid date')),
                                    }]}
                                >
                                    <DatePicker format="MM-DD-YYYY" onChange={(date, dateString)=> {this.handleDataChange("date", dateString)}}/>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row">
                                <Form.Item
                                    label="Start Time"
                                    name="time"
                                    rules={[
                                        { required: true, message: 'Enter a starting time' },
                                        {validator: (_, value) =>
                                                this.validateToday() ? Promise.resolve() : Promise.reject(new Error('Enter a valid time')),
                                        }]}
                                >
                                    <TimePicker use12Hours format="h:mm a" onChange={(time, timeString) => {this.handleDataChange('time', timeString)}
                                    }/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row">
                                <Form.Item
                                    label="Length"
                                    name="length"
                                    rules={[
                                        { required: true, message: 'Enter a meeting length' },
                                        {
                                            validator: (_, value) =>
                                                value >= 0  ? Promise.resolve() : Promise.reject(new Error('Enter a positive number')),
                                        }]}
                                >
                                    <InputNumber min={0} onChange={(value)=>this.handleDataChange('length', value)}/>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row">
                                <Form.Item name="unit" rules={[{ required: true, message: 'Enter a unit' }]}>
                                    <Radio.Group name="unit" onChange={(e)=>this.handleChange(e)}>
                                        <Radio.Button value="m">Minutes</Radio.Button>
                                        <Radio.Button value="h">Hours</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row">
                                <Form.Item
                                    name="participants"
                                    label="Participants"
                                >
                                    <ParticipantList setParticipants={(participants) => this.setParticipants(participants)}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row">

                            </Col>
                        </Row>
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
    createMeeting : meetingActions.createMeeting,
    getMeetings : meetingActions.getMeetings
};

const connectedCreateMeetingComponent = connect(mapState, actionCreators)(CreateMeetingComponent);
export { connectedCreateMeetingComponent as CreateMeetingComponent };