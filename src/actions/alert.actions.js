import { alertConstants } from '../constants';
import {message, notification} from "antd";

const ALERT_LENGTH = 4;

export const alertActions = {
    success,
    error,
    clear
};

/**
 * Displays a "success" toast message
 * @param content - string to be displayed in the toast message
 */
function success(content) {
    let config = {
        message : content,
        duration : ALERT_LENGTH
    }
    notification.success(config)
    return { type: alertConstants.SUCCESS, message };
}

/**
 * Displays a "failure" toast message
 * @param content - string to be displayed in the toast message
 */
function error(content) {
    let config = {
        message : content,
        duration : ALERT_LENGTH
    }
    notification.error(config)
    return { type: alertConstants.ERROR, message };
}

/**
 * Removes all toast messages
 */
function clear() {
    return { type: alertConstants.CLEAR };
}