import * as React from "react";
import {connect} from "react-redux";
import Exception from "../../components/exception/exception";

class Exception404Page extends React.Component {
    render() {
        return(
            <Exception
                type="404"
                title={404}
                backText="Go Back"
                desc="Page Not Found"
            />
        )};
}

function mapState(state) {
    return {}
}

const actionCreators = { }

const connectedHomePage = connect(mapState, actionCreators)(Exception404Page);
export { connectedHomePage as Exception404Page };