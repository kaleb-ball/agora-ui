import { alertConstants } from '../constants';
import {message, notification} from "antd";

const ALERT_LENGTH = 4;

export const alertActions = {
    success,
    error,
    clear
};

function success(content) {
    let config = {
        message : content,
        duration : ALERT_LENGTH
    }
    notification.success(config)
    return { type: alertConstants.SUCCESS, message };
}

function error(content) {
    let config = {
        message : content,
        duration : ALERT_LENGTH
    }
    notification.error(config)
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}