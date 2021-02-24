import React, { createElement } from 'react';
import {Button, Col, Image, Row} from 'antd';
import styles from '../../App.less';
import "./exception.css"
import Gopher from "../../assets/gopher.jpg"
import config from './typeConfig';

class Exception extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            className,
            backText,
            linkElement = 'a',
            type,
            title,
            desc,
            img,
            actions,
            ...rest
        } = this.props;
        const pageType = type in config ? type : '404';

        return (
            <div className="exception">
                <div className="imgBlock">
                    <div className="imgEle"/>
                </div>
                <div className={styles.content}>
                    <h1>{title}</h1>
                    <div className="desc">Page Not Found</div>
                    <Button type="primary">{backText}</Button>
                </div>
            </div>
        );
    }
}
export default Exception;