import { alertConstants } from '../constants';
import {message, notification} from "antd";

export const alertActions = {
    success,
    error,
    clear
};

function success(content, length) {
    let config = {
        message : content,
        duration : length
    }
    notification.success(config)
    return { type: alertConstants.SUCCESS, message };
}

function error(content, length ) {
    let config = {
        message : content,
        duration : length
    }
    notification.error(config)
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}