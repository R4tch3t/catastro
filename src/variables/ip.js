export default (port) => {
    const ip = 'localhost'
    //const ip = 'catastro.sys.chilapadealvarez.mx'
    //const ip = 'predial.chilapadealvarez.mx'
    //const ip = '192.168.1.94'
    //const ip = '74.208.88.161'
    //const ip = "www.chilapadealvarez.info"
    //const ip = "www.catastro.sys.chilapadealvarez.mx"
    //const sendUri = `https://${ip}:${port}/`;
    const sendUri = `http://${ip}:${port}/`;
    return sendUri
}