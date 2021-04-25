import {Tag, Tooltip, Mentions} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import React from "react";
import './ParticipantList.css'
import {get_id_by_value} from "../../../constants/platformConstants";
import {get_user_id} from "../../../constants";
import {inviteAction} from "../../../actions/invite.actions";
import {userActions} from "../../../actions";
import {Option} from "antd/es/mentions";

class ParticipantList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: this.props.participants ? this.props.participants : [],
            inputVisible: false,
            inputValue: '',
            editInputIndex: -1,
            editInputValue: '',
        };

        this.handleClose = this.handleClose.bind(this)
        this.showInput = this.showInput.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.saveInputRef = this.saveInputRef.bind(this)

        this.props.getUsers()
    }


    handleClose(removedTag) {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({tags});
        if (this.props.meeting) {
            console.log(this.props.meeting.participants.filter(participant => participant.username === removedTag)[0].inviteId)
            this.props.delete(this.props.meeting.participants.filter(participant => participant.username === removedTag)[0].inviteId)
        } else {
            this.props.setParticipants(tags)
        }
    };

    showInput() {
        this.setState({inputVisible: true}, () => this.input.focus());
    };



    handleSelect(option) {
        const inputValue = option.value
        let {tags} = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
        if (this.props.meeting){
            let invite = {}
            invite.meeting_id = this.props.meeting.id
            invite.meeting_platform_id = get_id_by_value(this.props.meeting.platform)
            invite.inviter_id = get_user_id()
            invite.invitee_username = inputValue
            console.log(invite)
            this.props.create(invite)
        } else {
            this.props.setParticipants(tags)
        }
    }

    saveInputRef(input) {
        this.input = input;
    };

    render() {
        const {tags, inputVisible} = this.state;
        const {users} = this.props
        return (
            <>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag}
                            closable={true}
                            onClose={() => this.handleClose(tag)}
                        >
                          <span>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                          </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    <Mentions
                        ref={this.saveInputRef}
                        className="tag-input"
                        onSelect={this.handleSelect}
                        autoSize={true}
                    >
                        {users.map(user => (<Option value={user.username}>{user.username}</Option>))}
                    </Mentions>
                )}
                {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={this.showInput}>
                        <PlusOutlined/> New Participant
                    </Tag>
                )}
            </>
        );
    }
}

function mapState(state) {
    return {
        users : state.getAllUsers.users
    }
}

const actionCreators = {
    create : inviteAction.createInvite,
    delete : inviteAction.deleteInvite,
    getUsers : userActions.getAllUsers
};

const connectedComponent = connect(mapState, actionCreators)(ParticipantList);
export {connectedComponent as ParticipantList};