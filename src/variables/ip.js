export default (port) => {
    const ip = 'localhost'
    //const ip = '74.208.88.161'
    //const ip = "www.chilapadealvarez.info"
    const sendUri = `http://${ip}:${port}/`;
    return sendUri
}