import React from "react";
import {connect} from "react-redux";
import {Card, Divider, List} from "antd";
import './SearchMeetingsList.css'
import {SearchMeetingComponent} from "./SearchMeeting";

/**
 * List of meetings to display on search page
 *
 * Props:
 * meetings - list of meetings to display
 * loading {boolean} - whether or not the meeting have loaded yet
 */
class SearchMeetingsList extends React.Component {

    render() {
        const {meetings, loading} = this.props;
        return (
            <div className="search-container">
                <Divider orientation="center">Results</Divider>
                <Card>
                    <List
                        itemLayout="vertical"
                        dataSource={meetings}
                        loading={loading}
                        locale={{emptyText : "No Meetings"}}
                        pagination={{pageSize : 5}}
                        renderItem={meeting => (
                            <SearchMeetingComponent meeting={meeting}/>
                        )}
                    />
                </Card>
            </div>
        )
    }
}

function mapState(state) {
    return {}
}

const actionCreators = {
}

const connectedComponent = connect(mapState, actionCreators)( SearchMeetingsList);
export { connectedComponent as SearchMeetingsList };
