import React from "react";
import {connect} from "react-redux";
import {Card, Divider, List} from "antd";
import {meetingActions} from "../../../actions";
import './SearchMeetingsList.css'
import {SearchMeetingComponent} from "./SearchMeeting";


class SearchMeetingsList extends React.Component {
    constructor(props) {
        super(props);

        this.startMeeting = this.startMeeting.bind(this)
    }

    startMeeting(id) {
        if (id) this.props.startMeeting(id);
    }


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
    startMeeting : meetingActions.startMeeting
}

const connectedComponent = connect(mapState, actionCreators)( SearchMeetingsList);
export { connectedComponent as SearchMeetingsList };
