import React from "react";

const ErrorNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    const notificationStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default ErrorNotification