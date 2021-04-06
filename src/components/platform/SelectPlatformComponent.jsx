import React from 'react';
import { connect } from 'react-redux';

import { Select} from 'antd'
import { isPast } from 'date-fns';
import {get_values} from "../../constants/platformConstants";

class SelectPlatformComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            platforms: get_values(),
            authenticatedPlatforms : localStorage.getItem('authenticatedPlatforms') ? JSON.parse(localStorage.getItem('authenticatedPlatforms')) : []
        }

        this.props.onSelect("platform", this.state.authenticatedPlatforms[0].name)


        this.handleChange = this.handleChange.bind(this)
        this.handleDataChange = this.handleDataChange.bind(this)
        this.disabled = this.disabled.bind(this)

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


    validateToday() {
        const {date, time} = this.state
        if (date && time) {
            return !isPast(new Date(date + ' ' + time));
        }
        return false;
    }

    disabled(platform) {
        return !this.state.authenticatedPlatforms.filter(x => x.name === platform).length >= 1;
    }

    render() {
        const {platforms, authenticatedPlatforms} = this.state;
        return (
            <Select
                style={{maxWidth:"25%", textTransform: "capitalize"}}
                onChange={(name) => this.props.onSelect("platform", name)}
                defaultValue={authenticatedPlatforms[0].name}
            >
                {platforms.map(platform => ( <Select.Option key={platform} style={{textTransform : "capitalize"}} disabled={this.disabled(platform)}>{platform}</Select.Option>))}
            </Select>
        )
    }
}

function mapState(state) {
    return {}
}

const actionCreators = {
};

const connectedComponent = connect(mapState, actionCreators)(SelectPlatformComponent);
export { connectedComponent as SelectPlatformComponent };