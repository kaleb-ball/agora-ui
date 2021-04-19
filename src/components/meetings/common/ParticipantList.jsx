import {Tag, Tooltip, Mentions} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import React from "react";
import './ParticipantList.css'
import {Option} from "antd/es/mentions";

class ParticipantList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            inputVisible: false,
            inputValue: '',
            editInputIndex: -1,
            editInputValue: '',
        };

        this.handleClose = this.handleClose.bind(this)
        this.showInput = this.showInput.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.saveInputRef = this.saveInputRef.bind(this)
    }


    handleClose(removedTag) {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({tags});
        this.props.setParticipants(tags)
    };

    showInput() {
        this.setState({inputVisible: true}, () => this.input.focus());
    };



    handleSelect(option) {
        console.log(option)
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
        this.props.setParticipants(tags)
    }

    saveInputRef(input) {
        this.input = input;
    };

    render() {
        const {tags, inputVisible} = this.state;
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
                    >
                        <Option value="test">Test</Option>
                        <Option value="test2">Test 2</Option>
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
    return {}
}

const actionCreators = {
};

const connectedComponent = connect(mapState, actionCreators)(ParticipantList);
export {connectedComponent as ParticipantList};