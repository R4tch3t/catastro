export default (port) => {
    //const ip = 'localhost'
    const ip = '192.168.1.66'
    const sendUri = `http://${ip}:${port}/`;
    return sendUri
}