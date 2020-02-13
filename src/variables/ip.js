export default (port) => {
    //const sendUri = "http://localhost:3015/";
    //const sendUri = `http://localhost:${port}/`;
    const ip = 'localhost'
    const sendUri = `http://${ip}:${port}/`;
    return sendUri
}