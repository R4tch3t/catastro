import ip from "variables/ip";
import spellNumber from "views/Dashboard/spellNumber";
export default async (fi, ff, c)=>{
  const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
  const dias = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO']
  const round = (num, decimales = 2) => {
    var signo = (num >= 0 ? 1 : -1);
    num = num * signo;
    if (decimales === 0) //con 0 decimales
      return signo * Math.round(num);
    // round(x * 10 ^ decimales)
    num = num.toString().split('e');
    num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
    // x * 10 ^ (-decimales)
    num = num.toString().split('e');
    return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
  }
  try {
      const dateFI = new Date(fi)
      let dateFF = new Date(ff)
      const sendUri = ip("3025");
      
      const bodyJSON = {
        fi: fi,
        ff: ff,
        bandG: true
      };
      const response = await fetch(sendUri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyJSON)
      });

      const responseJson = await response.json().then(r => {
        //  console.log(`Response1: ${r}`)
        let tzoffset = (new Date()).getTimezoneOffset() * 60000;
        if (r.ordenesu || r.ordenesr || r.ordenes) {
          let data = {};
          let total = 0;
          let idOrden = 0
          data.totalA = 0
          data.totalPU = 0
          data.totalPR = 0
          data.totalF = 0
          data.total = 0
          data.aux = 0
          data.isAlta = false
          data.porcentajeU = round(r.countU / r.lengthU * 100)
          data.porcentajeR = round(r.countR / r.lengthR * 100)
          data.porcentajeT = round((data.porcentajeU + data.porcentajeR) / 2)
          //console.log(data.porcentajeT + " " + r.countU)
          
          r.ordenesu.forEach(e => {
            
            switch (e.idImpuesto) {
              case 1:
              case 2:
              case 3:
                data.aux = parseInt(e.val)
                data.isAlta = false
                break;
              case 4:
              case 5:
              case 6:
              case 7:
                data.aux += parseInt(e.val)
                break;
              case 8:
                data.isAlta = true;
                data.totalA += data.aux
                data.totalA += parseInt(e.val)
                break;
              case 10:
              case 11:
              case 12:
              case 13:
              //data.aux += parseInt(e.val)
              if (data.isAlta){
                data.totalA += parseInt(e.val)
              }else{

                //if (idOrden !== e.idOrden) {
                  data.totalPU += parseInt(e.val);
                  data.totalPU += data.aux;
                  data.aux = 0
               // }

              }
                break;
              case 16:
              case 17:
              case 19:
                if(data.isAlta){
                  data.totalA += parseInt(e.val)
                  const q = Math.round(parseInt(e.val) * 0.15)
                  data.totalA += q * 2
                }
              
              break;
            }
            
            
          });
          
          idOrden=0
          r.ordenesr.forEach(e => {
            switch (e.idImpuesto) {
              case 1:
              case 2:
              case 3:
                data.aux = parseInt(e.val)
                data.isAlta = false
                break;
              case 4:
              case 5:
              case 6:
              case 7:
                data.aux += parseInt(e.val)
                break;
              case 8:
                data.isAlta = true
                data.totalA += data.aux
                data.totalA += parseInt(e.val)
                break;
              case 10:
              case 11:
              case 12:
              case 13:
              if (data.isAlta){
                data.totalA += parseInt(e.val)
              } else {

               // if (idOrden !== e.idOrden) {
                data.totalPR += parseInt(e.val);
                data.totalPR += data.aux;
                data.aux = 0
               // idOrden = e.idOrden;
               // }

              }
                break;
              /*case 13:
                data.totalA += parseInt(e.val)
                break;*/
              
              case 16:
              case 17:
              case 19:
                if(data.isAlta){
                  data.totalA += parseInt(e.val)
                  const q = Math.round(parseInt(e.val) * 0.15)
                  data.totalA += q * 2
                }
                
                break;
            }
            /*if (idOrden !== e.idOrden) {
              data.totalP += e.total
              idOrden = e.idOrden
            }*/

          });
        //  console.log(`data.totalA: ${data.totalA}`)
          r.ordenes.forEach(e => {

              data.totalF += e.total
            

          });
          data.total = data.totalPU + data.totalPR + data.totalF + data.totalA
         // if (data.numU === 0) data.numU=''
         const totalS = spellNumber(data.total)
          data.totalPU=data.totalPU.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
         
          if (data.totalPU!=='0'&&data.totalPU.toString().split('.').length === 1) {
            data.totalPU = `${data.totalPU}.00`
          } else if (data.totalPU === '0') {
            data.totalPU = ''
          }

          data.totalPR=data.totalPR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
         
          if (data.totalPR!=='0'&&data.totalPR.toString().split('.').length === 1) {
            data.totalPR = `${data.totalPR}.00`
          } else if (data.totalPR === '0') {
            data.totalPR = ''
          }

          data.totalA = data.totalA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

          if (data.totalA !== '0' && data.totalA.toString().split('.').length === 1) {
            data.totalA = `${data.totalA}.00`
          } else if (data.totalA === '0') {
            data.totalA = ''
          }

          data.totalF = data.totalF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

          if (data.totalF !== '0' && data.totalF.toString().split('.').length === 1) {
            data.totalF = `${data.totalF}.00`
          } else if (data.totalF === '0') {
            data.totalF = ''
          }

          data.total = data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

          if (data.total !== '0' && data.total.toString().split('.').length === 1) {
            data.total = `${data.total}.00`
          } else if (data.total === '0') {
            data.total = ''
          }
         
          dateFF.setDate(dateFF.getDate() - 1);
          c.setState({
            diaLI: dias[dateFI.getDay()],
            diaI: dateFI.getDate(),
            mesI: meses[dateFI.getMonth()],
            añoI: dateFI.getFullYear(),
            diaLF: dias[dateFF.getDay()],
            diaF: dateFF.getDate(),
            mesF: meses[dateFF.getMonth()],
            añoF: dateFF.getFullYear(),
            dataTable: data,
            total: total,
            renderPDF: true,
            totalS
          });

        }

        /*else if (r.error.name === "error01") {
                   this.removeCookies()
                   confirmAlert({
                     title: "¡Error!",
                     message: "La contraseña es incorrecta.",
                     buttons: [{
                       label: "Aceptar",
                       onClick: () => {
                         this.props.history.push("/entrar");
                       }
                     }]
                   });
                 }*/
      });
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };
