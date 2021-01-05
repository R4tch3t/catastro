import renderCI from "./renderCI";
export default (predial,c) => {
   let checkeds = []
   while (checkeds.length < 14) {
     checkeds.push([])
   };
   /*
   if(bandUp){
     const aux = [];
     predial.forEach(e => {
       switch(e.idImpuesto){
         case 1:
         case 5:
         case 10:
         case 11:
         case 12:
           aux.push(e)
           break;
       }
     });
     predial=aux;
   }*/
   predial.forEach(e => {
     if (e.idImpuesto === 1) {
       checkeds[0].push(0)
       document.getElementById('0020401').value = e.val
     }
     if (e.idImpuesto === 2) {
       checkeds[0].push(1)
       document.getElementById('0020402').value = e.val
     }
     if (e.idImpuesto === 3) {
       checkeds[1].push(0)
       document.getElementById('0020403').value = e.val
     }
     if (e.idImpuesto === 4) {
       checkeds[1].push(1)
       document.getElementById('0020801').value = e.val
     }
     if (e.idImpuesto === 5) {
       checkeds[2].push(0)
       document.getElementById('0020802').value = e.val
     }
     if (e.idImpuesto === 6) {
       checkeds[2].push(1)
       document.getElementById('0020803').value = e.val
     }
     if (e.idImpuesto === 7) {
       checkeds[3].push(0)
       document.getElementById('0020804').value = e.val
     }
     if (e.idImpuesto === 8) {
       //if(!bandUp){
        c.esAlta=true
        checkeds[3].push(1)
        document.getElementById('0030101').value = e.val
       //}
     }
     if (e.idImpuesto === 9) {
       checkeds[4].push(0)
       document.getElementById('0070101').value = e.val
     }
     if (e.idImpuesto === 10) {
       checkeds[4].push(1)
       document.getElementById('0070201').value = e.val
     }
     if (e.idImpuesto === 11) {
       checkeds[5].push(0)
       document.getElementById('0070202').value = e.val
     }
     if (e.idImpuesto === 12) {
       checkeds[5].push(1)
       document.getElementById('0070203').value = e.val
     }
     if (e.idImpuesto === 13) {
       checkeds[6].push(0)
       document.getElementById('0090101').value = e.val
     }
     if (e.idImpuesto === 14) {
       checkeds[7].push(0)
       document.getElementById('0090106').value = e.val
     }
     if (e.idImpuesto === 15) {
       checkeds[7].push(1)
       document.getElementById('0090107').value = e.val
     }
     if (e.idImpuesto === 16) {
       checkeds[8].push(0)
       document.getElementById('0090701').value = e.val
       if(e.val===66){
         c.setState({labelConsta: 'NO ADEUDO DEL IMPUESTO PREDIAL'})
       }
       if(e.val===112){
         c.setState({labelConsta: 'NO PROPIEDAD'})
       }
       if(e.val===225){
         c.setState({labelConsta: 'NO AFECTACIÓN'})
       }
       if(e.val===218){
         c.setState({labelConsta: 'NO GRAVAMEN'})
       }
     }
     if (e.idImpuesto === 17) {
       checkeds[8].push(1)
       document.getElementById('0090702').value = e.val
     }
     if (e.idImpuesto === 18) {
       checkeds[9].push(0)
       document.getElementById('0090703').value = e.val
     }
     if (e.idImpuesto === 19) {
       checkeds[9].push(1)
       document.getElementById('0090704').value = e.val
     }
     if (e.idImpuesto === 20) {
       checkeds[10].push(0)
       document.getElementById('00913').value = e.val
     }
     if (e.idImpuesto === 21) {
       checkeds[10].push(1)
       document.getElementById('0091301').value = e.val
     }
     if (e.idImpuesto === 22) {
       checkeds[11].push(0)
       document.getElementById('0010804').value = e.val
     }
     if (e.idImpuesto === 23) {
       checkeds[12].push(0)
       document.getElementById('0010101').value = e.val
     }
     if (e.idImpuesto === 24) {
       checkeds[13].push(0)
       document.getElementById('21173001001').value = e.val
     }
   });
   let task = [0, 1]
   if (checkeds[0].length > 0) {
     renderCI('subIm0', task, 6, checkeds[0], ['41121001', '41121001'],
       ['URBANOS EDIFICADOS DESTINADOS A CASA HABITACION',
         'SUB URBANOS EDIFICADOS DESTINADOS A CASA HABITACION'
       ], ['0020401', '0020402'], c);
   }
   if (checkeds[1].length > 0) {
     renderCI('subIm1', task, 6, checkeds[1], ['41121001', '41121001'],
       ['RUSTICOS EDIFICADOS DESTINADOS A CASA HABITACION',
         'PENSIONADOS Y JUBILADOS'
       ], ['0020403', '0020801'], c);
   }
   if (checkeds[2].length > 0) {
     renderCI('subIm2', task, 6, checkeds[2], ['41121001', '41121001'],
       ['INSEN',
         'PERSONAS DE CAPACIDADES DIFERENTES'
       ], ['0020802', '0020803'], c);
   }
   if (checkeds[3].length > 0) {
     renderCI('subIm3', task, 6, checkeds[3], ['41121001', '41131001'],
       ['MADRES Y/O PADRES SOLTEROS JEFES DE FAMILIA',
         'SOBRE ADQUISICIONES DE BIENES INMUEBLES'
       ], ['0020804', '0030101'], c);
   }
   if (checkeds[4].length > 0) {
     renderCI('subAcc0', task, 6, checkeds[4], ['41171001', '41171001'],
       ['RECARGOS PREDIAL', '15% PRO EDUCACION Y ASISTENCIA SOCIAL'],
       ['0070101', '0070201'], c);
   }
   if (checkeds[5].length > 0) {
     renderCI('subAcc1', task, 6, checkeds[5], ['41171001', '41171001'],
       ['15% PRO CAMINOS', 'DESCUENTO PREDIAL DE NATURALEZA DEUDORA'],
       ['0070202', '0070203'], c);
   }
   if (checkeds[6].length > 0) {
     renderCI('subAcc2', [0], 6, checkeds[6], ['41191001'],
       ['REZAGOS IMPUESTO PREDIAL'],
       ['0090101'], c);
   }
   if (checkeds[7].length > 0) {
     renderCI('subDer0', task, 6, checkeds[7], ['41491004', '41491004'],
       ['POR LA AUTORIZACION PARA LA FUSION DE PREDIOS',
         'POR LA AUTORIZACION PARA SUBDIVISION, LOTIFICACION Y RELOTIFICACION DE PREDIOS'
       ],
       ['0090106', '0090107'], c);
   }
   if (checkeds[8].length > 0) {
     renderCI('subCop0', task, 6, checkeds[8], ['41491004', '41491004'],
       ['CONSTANCIAS',
         'CERTIFICADO CATASTRAL'
       ],
       ['0090701', '0090702'], c);
   }
   if (checkeds[9].length > 0) {
     renderCI('subCop1', task, 6, checkeds[9], ['41491004', '41491004'],
       ['DUPLICADOS Y COPIAS',
         'OTROS SERVICIOS'
       ],
       ['0090703', '0090704'], c);
   }
   if (checkeds[10].length > 0) {
     renderCI('subCop2', task, 6, checkeds[10], ['41491004', '41491004'],
       ['PRO-BOMBEROS Y PROTECCION CIVIL',
         'LICENCIAS PARA CONSTRUCCION DE EDIFICIOS O CASAS HABITACION, RESTAURACION O REPARACION, URBANIZACION, FRACCIONAMIENTO LORIFIACION, RELOTIFICACION, FUSION Y SUB-DIVISION'
       ],
       ['00913', '0091301'], c);
   }
   if (checkeds[11].length > 0) {
     renderCI('subPro0', [0], 12, checkeds[11], ['41491005'],
       ['VENTAS DE FORMAS IMPRESAS POR JUEGOS (FORMA 3DCC)'],
       ['0010804'], c);
   }
   if (checkeds[12].length > 0) {
     renderCI('subApr0', [0], 12, checkeds[12], ['41621006'],
       ['MULTAS FISCALES (FALTA DE CUMPLIMIENTO DE OBLIGACIONES FISCALES)'],
       ['0010101'], c);
   }
   if (checkeds[13].length > 0) {
     renderCI('subDee0', [0], 12, checkeds[13], [''],
       ['15% DE CONTRIBUCION ESTATAL (APLICADO POR AUTORIZACION DE FUSION Y SUBDIVISION DE PREDIOS)'],
       ['21173001001'], c);
   }
}