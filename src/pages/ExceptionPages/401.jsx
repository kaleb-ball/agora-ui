import * as React from "react";
import {connect} from "react-redux";
import Exception from "../../components/exception/exception";

class Exception401Page extends React.Component {
    render() {
        return(
            <Exception
                type="401"
                title={401}
                backText="Go Back"
                desc="Unauthorized"
            />
        )};
}

function mapState(state) {
    return {}
}

const actionCreators = { }

const connectedPage = connect(mapState, actionCreators)(Exception401Page);
export { connectedPage as Exception401Page };