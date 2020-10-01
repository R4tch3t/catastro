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
          data.totalP = 0
          data.totalF = 0
          data.total = 0
          data.aux = 0
          data.isAlta = false
          console.log(r.ordenesu)
          r.ordenesu.forEach(e => {
            
            switch (e.idImpuesto) {
              case 1:
              case 2:
              case 3:
                data.aux = parseInt(e.val)
                data.isAlta = false
                break;
              case 8:
                data.isAlta = true;
                data.totalA += data.aux
                data.totalA += parseInt(e.val)
                break;
              case 10:
              case 11:
              case 13:
              //data.aux += parseInt(e.val)
              if (data.isAlta){
                data.totalA += parseInt(e.val)
              }else{

                //if (idOrden !== e.idOrden) {
                  data.totalP += parseInt(e.val);
                  data.totalP += data.aux;
                  data.aux = 0
               // }

              }
                break;
              case 16:
              case 17:
              case 19:
                if(data.isAlta){
                  data.totalA += parseInt(e.val)
                  //data.totalA += parseInt(e.val) * 0.3
                }
              
              break;
            }
            


            /*if (idOrden !== e.idOrden) {
                data.totalP += e.total
                idOrden = e.idOrden              
            }*/
            
          });
          
          idOrden=0
          r.ordenesr.forEach(e => {
            switch (e.idImpuesto) {
              case 1:
              case 2:
              case 3:
                data.aux = parseInt(e.val)
                data.isAlta = false
              case 8:
                data.isAlta = true
                data.totalA += data.aux
                data.totalA += parseInt(e.val)
                break;
              case 10:
              case 11:
              case 13:
              if (data.isAlta){
                data.totalA += parseInt(e.val)
              } else {

               // if (idOrden !== e.idOrden) {
                data.totalP += parseInt(e.val);
                data.totalP += data.aux;
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
                 // data.totalA += parseInt(e.val) * 0.3
                }
                
                break;
            }
            /*if (idOrden !== e.idOrden) {
              data.totalP += e.total
              idOrden = e.idOrden
            }*/

          });
          console.log(`data.totalA: ${data.totalA}`)
          r.ordenes.forEach(e => {

              data.totalF += e.total
            

          });
          data.total = data.totalP + data.totalF + data.totalA
         // if (data.numU === 0) data.numU=''
         const totalS = spellNumber(data.total)
          data.totalP=data.totalP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
         
          if (data.totalP!=='0'&&data.totalP.toString().split('.').length === 1) {
            data.totalP = `${data.totalP}.00`
          } else if (data.totalP === '0') {
            data.totalP = ''
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
