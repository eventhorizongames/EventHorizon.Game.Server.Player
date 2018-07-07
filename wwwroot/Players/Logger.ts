
export const log = () => {
    Array.prototype.forEach.call(arguments, function (message) {
        if (message instanceof Error) {
            message = "Error: " + message.message;
        } else if (typeof message !== 'string') {
            message = JSON.stringify(message, null, 2);
        }
        document.getElementById('results').innerHTML += message + '\r\n';
    });
};