import ip from "variables/ip";
export default async (fi, ff, c)=>{
  const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
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
      console.log(dateFI)
      const sendUri = ip("3025");
      
      const bodyJSON = {
        fi: fi,
        ff: ff
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
        if (r.ordenesu || r.ordenesr) {
          let data = {};
          let total = 0;
          let idOrden = 0
          data.numU = 0
          data.numSub = 0
          data.numR = 0
          data.urbanoI = 0
          data.suburbanoI = 0
          data.rusticoI = 0
          data.reOrden = 0
          data.recargosN = 0
          data.recargosI = 0
          data.recargosNR = 0
          data.recargosIR = 0
          data.rezOrden = 0
          data.rezagosN = 0
          data.rezagosNR = 0
          data.rezagosI = 0
          data.rezagosIR = 0
          data.vOrden = 0
          data.virtualN = 0
          data.virtualI = 0
          data.virtualNR = 0
          data.virtualIR = 0
          data.virtualI2 = 0
          data.virtualIR2 = 0
          console.log(r.ordenesu)
          console.log(r.ordenesr)
          r.ordenesu.forEach(e => {
            
            switch (e.idImpuesto){
              case 1:
                data.urbanoI += parseInt(e.val)
                data.vir = parseInt(e.val)
                if (idOrden !== e.idOrden) {
                  data.numU++
                  idOrden = e.idOrden
                }
                break;
              case 2:
                data.suburbanoI += parseInt(e.val)
                if (idOrden !== e.idOrden) {
                  data.numSub++
                  idOrden = e.idOrden
                }
                break;
              case 4:
              case 5:
              case 6:
              case 7:
                data.virtualI += data.vir
                //data.virtualI2 += data.vir * 0.30 // + data.virtualI
              if (data.vOrden !== e.idOrden) {
                data.virtualN++
                data.vOrden = e.idOrden
              }
              break;
              case 9:
                data.recargosI += parseInt(e.val)
              if (data.reOrden !== e.idOrden) {
                data.recargosN++
                data.reOrden = e.idOrden
              }
              break;
              case 13:
                data.rezagosI += parseInt(e.val)
              if (data.rezOrden !== e.idOrden) {
                data.rezagosN++
                data.rezOrden = e.idOrden
              }
              break;
            }
            
          });
          data.reOrden=0
          data.vOrden=0
          data.rezOrden=0
          idOrden=0
          r.ordenesr.forEach(e => {
            switch (e.idImpuesto) {
              case 3:
                data.rusticoI += parseInt(e.val)
                data.vir = parseInt(e.val)
                if (idOrden !== e.idOrden) {
                  data.numR++
                  idOrden = e.idOrden
                }
                break;
              case 4:
              case 5:
              case 6:
              case 7:
                data.virtualIR += data.vir
                //data.virtualIR2 += data.vir * 0.30// + data.virtualIR
              if (data.vOrden !== e.idOrden) {
                data.virtualNR++
                data.vOrden = e.idOrden
              }
              break;
              case 9:
                data.recargosIR += parseInt(e.val)
              if (data.reOrden !== e.idOrden) {
                data.recargosNR++
                data.reOrden = e.idOrden
              }
              break;
              case 13:
                data.rezagosIR += parseInt(e.val)
              if (data.rezOrden !== e.idOrden) {
                data.rezagosNR++
                data.rezOrden = e.idOrden
              }
              break;
            }

          });
          data.impuestoT = data.numU + data.numSub + data.numR
          data.urbanoNT = data.numU + data.rezagosN
          data.suburbanoNT = data.numSub
          data.rusticoNT = data.numR + data.rezagosNR
          data.totalN = data.numU + data.numSub + data.numR + data.rezagosN + data.rezagosNR
          data.urbanoIT = data.urbanoI + data.rezagosI

          //data.suburbanoIT = data.suburbanoI + data.rezagosI
          data.virtualI2 = data.virtualI * 0.30
          data.virtualI2 = round(data.virtualI2)
          data.virtualIR2 = data.virtualIR * 0.30
          data.virtualIR2 = round(data.virtualIR2)
          data.rusticoIT = data.rusticoI + data.rezagosIR
          data.virtualNT = data.virtualN + data.virtualNR
          data.virtualIT = data.virtualI + data.virtualIR
          data.virtualIT2 = data.virtualI2 + data.virtualIR2
          if (data.numU === 0) data.numU=''
          if (data.numSub === 0) data.numSub=''
          if (data.numR === 0) data.numR=''
          if (data.recargosN === 0) data.recargosN = ''
          if (data.recargosNR === 0) data.recargosNR = ''
          if (data.rezagosN === 0) data.rezagosN = ''
          if (data.rezagosNR === 0) data.rezagosNR = ''
          if (data.urbanoNT === 0) data.urbanoNT = ''
          if (data.suburbanoNT === 0) data.suburbanoNT = ''
          if (data.rusticoNT === 0) data.rusticoNT = ''
          if (data.virtualN === 0) data.virtualN = ''
          if (data.virtualNR === 0) data.virtualNR = ''
          if (data.virtualNT === 0) data.virtualNT = ''
          data.totalI = data.rusticoI + data.urbanoI + data.suburbanoI
          data.totalRI = data.recargosI + data.recargosIR
          data.totalRezI = data.rezagosI + data.rezagosIR
          data.totalIT = data.totalI + data.totalRI + data.totalRezI
          data.urbanoA = data.urbanoI * 0.30
          data.urbanoA = round(data.urbanoA)
          data.suburbanoA = data.suburbanoI * 0.30
          data.suburbanoA = round(data.suburbanoA)
          data.rusticoA = data.rusticoI * 0.30
          data.rusticoA = round(data.rusticoA)
          data.totalA = data.urbanoA + data.suburbanoA + data.rusticoA
          data.rezagosA = data.rezagosI * 0.30
          data.rezagosA = round(data.rezagosA)
          data.rezagosAR = data.rezagosIR * 0.30
          data.rezagosAR = round(data.rezagosAR)
          data.totalRezA = data.rezagosA + data.rezagosAR
          data.lengthU = r.lengthU
          data.lengthR = r.lengthR
          data.lengthT = r.lengthU+r.lengthR
          data.padronU =  data.urbanoIT+data.urbanoA+data.rezagosA+data.virtualI+data.virtualI2
          data.padronU = round(data.padronU)
          data.padronR = data.rusticoIT+data.rusticoA+data.rezagosAR+data.virtualIR+data.virtualIR2
          data.padronR = round(data.padronR)
          data.padronT = data.totalIT+data.totalA+data.totalRezA+data.virtualIT+data.virtualIT2
          data.padronT = round(data.padronT)
          data.urbanoI=data.urbanoI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.suburbanoI = data.suburbanoI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.rusticoI = data.rusticoI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.totalI = data.totalI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.recargosI = data.recargosI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.recargosIR = data.recargosIR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.totalRI = data.totalRI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.rezagosI = data.rezagosI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.rezagosIR = data.rezagosIR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.totalRezI = data.totalRezI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.urbanoIT = data.urbanoIT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.rusticoIT = data.rusticoIT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.totalIT = data.totalIT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.urbanoA = data.urbanoA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.suburbanoA = data.suburbanoA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.rusticoA = data.rusticoA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.totalA = data.totalA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.rezagosA = data.rezagosA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.rezagosAR = data.rezagosAR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.totalRezA = data.totalRezA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.virtualI = data.virtualI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.virtualIR = data.virtualIR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.virtualI2 = data.virtualI2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.virtualIR2 = data.virtualIR2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.virtualIT = data.virtualIT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.virtualIT2 = data.virtualIT2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.lengthU = data.lengthU.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.lengthR = data.lengthR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.lengthT = data.lengthT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.padronU = data.padronU.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.padronR = data.padronR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          data.padronT = data.padronT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          if (data.urbanoI!=='0'&&data.urbanoI.toString().split('.').length === 1) {
            data.urbanoI = `${data.urbanoI}.00`
          } else if (data.urbanoI === '0') {
            data.urbanoI = ''
          }
          if (data.suburbanoI!=='0'&&data.suburbanoI.split('.').length === 1) {
            data.suburbanoI = `${data.suburbanoI}.00`
          } else if (data.suburbanoI==='0'){
            data.suburbanoI=''
          }
          if (data.rusticoI!=='0'&&data.rusticoI.split('.').length === 1) {
            data.rusticoI = `${data.rusticoI}.00`
          } else if (data.rusticoI === '0') {
            data.rusticoI = ''
          }
          if (data.totalI!=='0'&&data.totalI.split('.').length === 1) {
            data.totalI = `${data.totalI}.00`
          } else if (data.totalI === '0') {
            data.totalI = ''
          }
          if (data.recargosI !== '0' && data.recargosI.split('.').length === 1) {
            data.recargosI = `${data.recargosI}.00`
          } else if (data.recargosI === '0') {
            data.recargosI = ''
          }
          if (data.recargosIR !== '0' && data.recargosIR.split('.').length === 1) {
            data.recargosIR = `${data.recargosIR}.00`
          } else if (data.recargosIR === '0') {
            data.recargosIR = ''
          }
          if (data.totalRI !== '0' && data.totalRI.split('.').length === 1) {
            data.totalRI = `${data.totalRI}.00`
          } else if (data.totalRI === '0') {
            data.totalRI = ''
          }
          if (data.rezagosI !== '0' && data.rezagosI.split('.').length === 1) {
            data.rezagosI = `${data.rezagosI}.00`
          } else if (data.rezagosI === '0') {
            data.rezagosI = ''
          }
          if (data.rezagosIR !== '0' && data.rezagosIR.split('.').length === 1) {
            data.rezagosIR = `${data.rezagosIR}.00`
          } else if (data.rezagosIR === '0') {
            data.rezagosIR = ''
          }
          if (data.totalRezI !== '0' && data.totalRezI.split('.').length === 1) {
            data.totalRezI = `${data.totalRezI}.00`
          } else if (data.totalRezI === '0') {
            data.totalRezI = ''
          }
          if (data.urbanoIT !== '0' && data.urbanoIT.toString().split('.').length === 1) {
            data.urbanoIT = `${data.urbanoIT}.00`
          } else if (data.urbanoIT === '0') {
            data.urbanoIT = ''
          }
          if (data.rusticoIT !== '0' && data.rusticoIT.toString().split('.').length === 1) {
            data.rusticoIT = `${data.rusticoIT}.00`
          } else if (data.rusticoIT === '0') {
            data.rusticoIT = ''
          }
          if (data.totalIT !== '0' && data.totalIT.toString().split('.').length === 1) {
            data.totalIT = `${data.totalIT}.00`
          } else if (data.totalIT === '0') {
            data.totalIT = ''
          }
          if (data.urbanoA!=='0'&&data.urbanoA.toString().split('.').length === 1) {
            data.urbanoA = `${data.urbanoA}.00`
          } else if (data.urbanoA === '0') {
            data.urbanoA = ''
          }
          if (data.suburbanoA !== '0' && data.suburbanoA.toString().split('.').length === 1) {
            data.suburbanoA = `${data.suburbanoA}.00`
          } else if (data.suburbanoA === '0') {
            data.suburbanoA = ''
          }
          if (data.rusticoA !== '0' && data.rusticoA.toString().split('.').length === 1) {
            data.rusticoA = `${data.rusticoA}.00`
          } else if (data.rusticoA === '0') {
            data.rusticoA = ''
          }
          if (data.totalA !== '0' && data.totalA.toString().split('.').length === 1) {
            data.totalA = `${data.totalA}.00`
          } else if (data.totalA === '0') {
            data.totalA = ''
          }
          if (data.rezagosA !== '0' && data.rezagosA.toString().split('.').length === 1) {
            data.rezagosA = `${data.rezagosA}.00`
          } else if (data.rezagosA === '0') {
            data.rezagosA = ''
          }
          if (data.rezagosAR !== '0' && data.rezagosAR.toString().split('.').length === 1) {
            data.rezagosAR = `${data.rezagosAR}.00`
          } else if (data.rezagosAR === '0') {
            data.rezagosAR = ''
          }
          if (data.totalRezA !== '0' && data.totalRezA.toString().split('.').length === 1) {
            data.totalRezA = `${data.totalRezA}.00`
          } else if (data.totalRezA === '0') {
            data.totalRezA = ''
          }
          if (data.virtualI !== '0' && data.virtualI.toString().split('.').length === 1) {
            data.virtualI = `${data.virtualI}.00`
          } else if (data.virtualI === '0') {
            data.virtualI = ''
          }
          if (data.virtualIR !== '0' && data.virtualIR.toString().split('.').length === 1) {
            data.virtualIR = `${data.virtualIR}.00`
          } else if (data.virtualIR === '0') {
            data.virtualIR = ''
          }
          if (data.virtualI2 !== '0' && data.virtualI2.toString().split('.').length === 1) {
            data.virtualI2 = `${data.virtualI2}.00`
          } else if (data.virtualI2 === '0') {
            data.virtualI2 = ''
          }
          if (data.virtualIR2 !== '0' && data.virtualIR2.toString().split('.').length === 1) {
            data.virtualIR2 = `${data.virtualIR2}.00`
          } else if (data.virtualIR2 === '0') {
            data.virtualIR2 = ''
          }
          if (data.virtualIT !== '0' && data.virtualIT.toString().split('.').length === 1) {
            data.virtualIT = `${data.virtualIT}.00`
          } else if (data.virtualIT === '0') {
            data.virtualIT = ''
          }
          if (data.virtualIT2 !== '0' && data.virtualIT2.toString().split('.').length === 1) {
            data.virtualIT2 = `${data.virtualIT2}.00`
          } else if (data.virtualIT2 === '0') {
            data.virtualIT2 = ''
          }
          if (data.padronU !== '0' && data.padronU.toString().split('.').length === 1) {
            data.padronU = `${data.padronU}.00`
          } else if (data.padronU === '0') {
            data.padronU = ''
          }
          if (data.padronR !== '0' && data.padronR.toString().split('.').length === 1) {
            data.padronR = `${data.padronR}.00`
          } else if (data.padronR === '0') {
            data.padronR = ''
          }
          if (data.padronT !== '0' && data.padronT.toString().split('.').length === 1) {
            data.padronT = `${data.padronT}.00`
          } else if (data.padronT === '0') {
            data.padronT = ''
          }
          c.setState({
            dia: dateFI.getDate(),
            mes: meses[dateFI.getMonth()],
            dataTable: data,
            total: total,
            renderPDF: true
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
