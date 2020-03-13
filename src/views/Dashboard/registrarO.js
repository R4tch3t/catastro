import ip from "variables/ip.js";
import saveDataL from "./saveDataL";
import encrypt from "./encrypt";
export default async(CTA,c) => {
   
    try {

        //const sendUri = "http://localhost:3016/";
        c.setState({disabledReg:true})
        const sendUri = ip('3016');
        //const CTA = document.getElementById('CTA').value;
        const calle = document.getElementById('calle').value.toUpperCase();
        let lote = document.getElementById('lote').value.toUpperCase();
        let manzana = document.getElementById('manzana').value.toUpperCase();
        let numCalle = document.getElementById('numCalle').value.toUpperCase();
        const colonia = document.getElementById('colonia').value.toUpperCase();
        let cp = document.getElementById('cp').value;
        const municipio = document.getElementById('municipio').value.toUpperCase();
        const localidad = document.getElementById('localidad').value.toUpperCase();
        let bg = document.getElementById('baseGravable').value;
        const periodo = document.getElementById('periodo').value;
        const dateUp = document.getElementById('dateUp');
        const idEmpleado = c.props.idUsuario;
        let {totalN} = c.state;
        const m1 = document.getElementById('m1').value;
        const m2 = document.getElementById('m2').value;
        const tc = document.getElementById('tc').value;
        const zona = document.getElementById('zona').value;
        const {tipoPredio} = c.state;
        const idImpuestos = [];
        const removI = [];
        let I0020401 = document.getElementById('I0020401').checked;
        let V0020401 = document.getElementById('0020401').value
        if (I0020401) {
          idImpuestos.push({id: 1, val: V0020401});
          V0020401 = V0020401.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0020401 = `${V0020401}.00`
        }else{
          removI.push({id: 1});
        }
        let I0020402 = document.getElementById('I0020402').checked;
        let V0020402 = document.getElementById('0020402').value
        if(I0020402){
          idImpuestos.push({id: 2, val: V0020402});
          V0020402 = V0020402.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0020402 = `${V0020402}.00`
        }else{
          removI.push({id: 2});
        }
        let I0020403 = document.getElementById('I0020403').checked;
        let V0020403 = document.getElementById('0020403').value;
        if (I0020403) {
          idImpuestos.push({id: 3, val: V0020403});
          V0020403 = V0020403.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0020403 = `${V0020403}.00`
        }else{
          removI.push({id: 3});
        }
        let I0020801 = document.getElementById('I0020801').checked;
        let V0020801 = document.getElementById('0020801').value
        if (I0020801 || V0020801 !== '0') {
          idImpuestos.push({id: 4, val: V0020801});
          V0020801 = V0020801.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0020801 = `${V0020801}.00`
        }else{
          removI.push({id: 4});
        }
        let I0020802 = document.getElementById('I0020802').checked;
        let V0020802 = document.getElementById('0020802').value
        if (I0020802) {
          idImpuestos.push({id: 5, val: V0020802});
          V0020802 = V0020802.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0020802 = `${V0020802}.00`
        }else{
          removI.push({id: 5});
        }
        let I0020803 = document.getElementById('I0020803').checked;
        let V0020803 = document.getElementById('0020803').value
        if (I0020803) {
          idImpuestos.push({id: 6, val: V0020803});
          V0020803 = V0020803.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0020803 = `${V0020803}.00`
        }else{
          removI.push({id: 6});
        }
        let I0020804 = document.getElementById('I0020804').checked;
        let V0020804 = document.getElementById('0020804').value
        if(I0020804){
          idImpuestos.push({id: 7, val: V0020804});
          V0020804 = V0020804.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0020804 = `${V0020804}.00`
        }else{
          removI.push({id: 7});
        }
        let I0030101 = document.getElementById('I0030101').checked;
        let V0030101 = document.getElementById('0030101').value
        if(I0030101){
          idImpuestos.push({id: 8, val: V0030101});
          V0030101 = V0030101.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0030101 = `${V0030101}.00`
        }else{
          removI.push({id: 8});
        }
        let I0070101 = document.getElementById('I0070101').checked;
        let V0070101 = document.getElementById('0070101').value
        if(I0070101){
          idImpuestos.push({id: 9, val: V0070101});
          V0070101 = V0070101.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0070101 = `${V0070101}.00`
        }else{
          removI.push({id: 9});
        }
        let I0070201 = document.getElementById('I0070201').checked;
        let V0070201 = document.getElementById('0070201').value
        if(I0070201){
          idImpuestos.push({id: 10, val: V0070201});
          V0070201 = V0070201.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0070201 = `${V0070201}.00`
        }else{
          removI.push({id: 10});
        }
        let I0070202 = document.getElementById('I0070202').checked;
        let V0070202 = document.getElementById('0070202').value
        if(I0070202){
          idImpuestos.push({id: 11, val: V0070202});
          V0070202 = V0070202.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0070202 = `${V0070202}.00`
        }else{
          removI.push({id: 11});
        }
        let I0070203 = document.getElementById('I0070203').checked;
        let V0070203 = document.getElementById('0070203').value
        if (I0070203) {
          idImpuestos.push({id: 12, val: V0070203});
          V0070203 = V0070203.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0070203 = `${V0070203}.00`
        }else{
          removI.push({id: 12});
        }
        let I0090101 = document.getElementById('I0090101').checked;
        let V0090101 = document.getElementById('0090101').value
        if (I0090101) {
          idImpuestos.push({id: 13, val: V0090101});
          V0090101 = V0090101.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0090101 = `${V0090101}.00`
        }else{
          removI.push({id: 13});
        }
        let I0090106 = document.getElementById('I0090106').checked;
        let V0090106 = document.getElementById('0090106').value
        if (I0090106) {
          idImpuestos.push({id: 14, val: V0090106});
          V0090106 = V0090106.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0090106 = `${V0090106}.00`
        }else{
          removI.push({id: 14});
        }
        let I0090107 = document.getElementById('I0090107').checked;
        let V0090107 = document.getElementById('0090107').value
        if (I0090107) {
          idImpuestos.push({id: 15, val: V0090107});
          V0090107 = V0090107.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0090107 = `${V0090107}.00`
        }else{
          removI.push({id: 15});
        }
        let I0090701 = document.getElementById('I0090701').checked;
        let V0090701 = document.getElementById('0090701').value
        if (I0090701) {
          idImpuestos.push({id: 16, val: V0090701});
          V0090701 = V0090701.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0090701 = `${V0090701}.00`
        }else{
          removI.push({id: 16});
        }
        let I0090702 = document.getElementById('I0090702').checked;
        let V0090702 = document.getElementById('0090702').value
        if (I0090702) {
          idImpuestos.push({id: 17, val: V0090702});
          V0090702 = V0090702.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0090702 = `${V0090702}.00`
        }else{
          removI.push({id: 17});
        }
        let I0090703 = document.getElementById('I0090703').checked;
        let V0090703 = document.getElementById('0090703').value
        if (I0090703) {
          idImpuestos.push({id: 18, val: V0090703});
          V0090703 = V0090703.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0090703 = `${V0090703}.00`
        }else{
          removI.push({id: 18});
        }
        let I0090704 = document.getElementById('I0090704').checked;
        let V0090704 = document.getElementById('0090704').value
        if (I0090704) {
          idImpuestos.push({id: 19, val: V0090704});
          V0090704 = V0090704.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0090704 = `${V0090704}.00`
        }else{
          removI.push({id: 19});
        }
        let I00913 = document.getElementById('I00913').checked;
        let V00913 = document.getElementById('00913').value
        if (I00913) {
          idImpuestos.push({id: 20, val: V00913});
          V00913 = V00913.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V00913 = `${V00913}.00`
        }else{
          removI.push({id: 20});
        }
        let I0091301 = document.getElementById('I0091301').checked;
        let V0091301 = document.getElementById('0091301').value
        if (I0091301) {
          idImpuestos.push({id: 21, val: V0091301});
          V0091301 = V0091301.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0091301 = `${V0091301}.00`
        }else{
          removI.push({id: 21});
        }
        let I0010804 = document.getElementById('I0010804').checked;
        let V0010804 = document.getElementById('0010804').value
        if(I0010804){
          idImpuestos.push({id: 22, val: V0010804});
         // V0010804 = V0010804.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
         // V0010804 = `${V0010804}.00`
        }else{
          removI.push({id: 22});
        }
        let I0010101 = document.getElementById('I0010101').checked;
        let V0010101 = document.getElementById('0010101').value
        if(I0010101){
          idImpuestos.push({id: 23, val: V0010101});
          V0010101 = V0010101.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V0010101 = `${V0010101}.00`
        }else{
          removI.push({id: 23});
        }
        let I21173001001 = document.getElementById('I21173001001').checked;
        let V21173001001 = document.getElementById('21173001001').value
        if (I21173001001) {
          idImpuestos.push({id: 24, val: V21173001001});
          V21173001001 = V21173001001.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          V21173001001 = `${V21173001001}.00`
        }else{
          removI.push({id: 24});
        }

        const bodyJSON = {
          CTA: CTA,
          calle: calle,
          lote: lote,
          manzana: manzana,
          numero: numCalle,
          colonia: colonia,
          cp: cp,
          municipio: municipio,
          localidad: localidad,
          periodo: periodo,
          dateUp: dateUp.value,
          idEmpleado: idEmpleado,
          m1: m1,
          m2: m2,
          tc: tc,
          zona: zona,
          bg: bg,
          total: totalN,
          tp: tipoPredio,
          idImpuestos: idImpuestos,
          removI: removI
        }
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });

        const responseJson = await response.json().then(r => {
            //console.log(`Response1: ${r}`)
            console.log(r)
            if (r.exito !== undefined) {
              
              if(r.exito===0){
                //let pubKey = publicKey();
                
                
                
                // Generate RSA key pair, default key size is 4096 bit
               /* rsa.generateKeyPair(function(keyPair) {
                  // Callback function receives new key pair as a first argument
                  publicKey = keyPair.publicKey;
                  privateKey = keyPair.privateKey;
                  console.log(privateKey);
                  console.log(publicKey);
                  let encrypted = crypt.encrypt(publicKey, message);
                  console.log(encrypted);
                  //let encrypted ='';

                  // Decrypt encryped message with private RSA key
                  let decrypted = crypt.decrypt(privateKey, encrypted);

                  // Get decrypted message
                  message = decrypted.message;
                  console.log(decrypted.message);
                });*/

                c.showNotification("trA")
                const nombre = document.getElementById('nombre').value;
                const tipoP = tipoPredio === 'u' ? 'URBANO' : tipoPredio === 'r' ? 'RÚSTICO' : ''
                const {idRol} = c.props
                let url = idRol === '1' ? `#/admin/orden` : `#/usuario/orden`
                if(lote==='0'){
                  lote=''
                }
                if(manzana==='0'){
                  manzana=''
                }
                if(numCalle==='0'){
                  numCalle = ''
                }
                if(cp==='0'){
                  cp = ''
                }
                let folio = r.folio ? r.folio.toString():''
                while (folio.length<5){
                  folio = `0${folio}`
                }
                
                let tzoffset = (new Date()).getTimezoneOffset() * 60000; 
                let d=null
                if (CTA !== '') {
                  d = new Date(r.dateUp) - tzoffset
                }else{
                  d = new Date() - tzoffset
                }
                d = new Date(d)
                dateUp.value = d.toISOString().slice(0, -1)
                
                bg = bg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                bg = `${bg}.00`
                let subUrl = `?bandPdf=1&CTA=${CTA}&folio=${folio}&nombre=${nombre}&calle=${calle}&lote=${lote}&manzana=${manzana}&numero=${numCalle}`
                subUrl += `&colonia=${colonia}&cp=${cp}&municipio=${municipio}&localidad=${localidad}&tipoP=${tipoP}`
                subUrl += `&bg=${bg}&total=${totalN}&periodo=${periodo}&dateUp=${dateUp.value}&V0020401=${V0020401}&V0020402=${V0020402}&V0020403=${V0020403}`
                subUrl += `&V0020801=${V0020801}&V0020802=${V0020802}&V0020803=${V0020803}&V0020804=${V0020804}&V0030101=${V0030101}`
                subUrl += `&V0070101=${V0070101}&V0070201=${V0070201}&V0070202=${V0070202}&V0070203=${V0070203}&V0090101=${V0090101}`
                subUrl += `&V0090106=${V0090106}&V0090107=${V0090107}&V0090701=${V0090701}&V0090702=${V0090702}&V0090703=${V0090703}`
                subUrl += `&V0090704=${V0090704}&V00913=${V00913}&V0091301=${V0091301}&V0010804=${V0010804}&V0010101=${V0010101}`
                subUrl += `&V21173001001=${V21173001001}`
                url += `?v=${encrypt(subUrl)}`;
                const win = window.open(url, '_blank');
                win.focus();
                saveDataL(CTA,c.street,c.barr,c.state.zona,tipoPredio,c)
               // orden.style.display = 'none'
               // ReactDOM.render(<Pdf calle='11 Norte' />,document.getElementById("pdfView"))
              }             
            }
            
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}