import React from "react";

const Notification = ({ message }) => {
    if (message.errorMessage === null && message.successMessage === null) {
        return null
    }

    if (message.errorMessage) {
        return (
            <div className="error">
                {message.errorMessage}
            </div>
        )
    } else {
        return (
            <div className="success">
                {message.successMessage}
            </div>
        )
    }
}

export default Notification