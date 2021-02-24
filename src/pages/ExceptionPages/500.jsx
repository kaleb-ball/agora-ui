import * as React from "react";
import {Row} from "antd";
import {connect} from "react-redux";
import Exception from "../../components/exception/exception";
import {Link} from "react-router-dom";

class Exception500Page extends React.Component {
    render() {
        return(
            <Exception
                type="500"
                title={500}
                backText="Go Back"
                desc="Internal Server Error"
            />
        )};
}

function mapState(state) {
    return {}
}

const actionCreators = { }

const connectedPage = connect(mapState, actionCreators)(Exception500Page);
export { connectedPage as Exception500Page };