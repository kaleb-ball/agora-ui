import React  from 'react';
import {Button} from 'antd';
import "./exception.css"
import {history} from "../../helpers";

/**
 * Generic exception page
 *
 * Props:
 * backText {string} - text to be displayed in back button
 * title {string} - title of the page
 * desc {string} - description to be displayed on page
 */
class Exception extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            backText,
            title,
            desc
        } = this.props;

        return (
            <div className="exception">
                <div className="imgBlock">
                    <div className="imgEle"/>
                </div>
                <div className="content">
                    <h1>{title}</h1>
                    <div className="desc">{desc}</div>
                    <Button
                        type="primary"
                        onClick={() => {history.push("/")}}>
                        {backText}
                    </Button>
                </div>
            </div>
        );
    }
}
export default Exception;