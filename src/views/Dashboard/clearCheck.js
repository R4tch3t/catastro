import renderCI from "./renderCI";
export default (fa) => {
    const task = [0,1]
     renderCI('subIm0', task, 6, [], ['41121001', '41121001'],
       ['URBANOS EDIFICADOS DESTINADOS A CASA HABITACIÓN',
         'SUB URBANOS EDIFICADOS DESTINADOS A CASA HABITACIÓN'
       ], ['0020401', '0020402'], fa);
       document.getElementById('0020401').value = 0
       document.getElementById('0020402').value = 0
   
     renderCI('subIm1', task, 6, [], ['41121001', '41121001'],
       ['RÚSTICOS EDIFICADOS DESTINADOS A CASA HABITACIÓN',
         'PENSIONADOS Y JUBILADOS'
       ], ['0020403', '0020801'], fa);
       document.getElementById('0020403').value = 0
       document.getElementById('0020801').value = 0

     renderCI('subIm2', task, 6, [], ['41121001', '41121001'],
       ['INSEN',
         'PERSONAS DE CAPACIDADES DIFERENTES'
       ], ['0020802', '0020803'], fa);
       document.getElementById('0020802').value = 0
       document.getElementById('0020803').value = 0
   
     renderCI('subIm3', task, 6, [], ['41121001', '41131001'],
       ['MADRES Y/O PADRES SOLTEROS JEFES DE FAMILIA',
         'SOBRE ADQUISICIONES DE BIENES INMUEBLES'
       ], ['0020804', '0030101'], fa);
       document.getElementById('0020804').value = 0
       document.getElementById('0030101').value = 0

     renderCI('subAcc0', task, 6, [], ['41171001', '41171001'],
       ['RECARGOS PREDIAL', '15% PRO EDUCACIÓN Y ASISTENCIA SOCIAL'],
       ['0070101', '0070201'], fa);
       document.getElementById('0070101').value = 0
       document.getElementById('0070201').value = 0
   
     renderCI('subAcc1', task, 6, [], ['41171001', '41171001'],
       ['15% PRO CAMINOS', 'DESCUENTO PREDIAL DE NATURALEZA DEUDORA'],
       ['0070202', '0070203'], fa);
       document.getElementById('0070202').value = 0
       document.getElementById('0070203').value = 0

     renderCI('subAcc2', [0], 6, [], ['41191001'],
       ['REZAGOS IMPUESTO PREDIAL'],
       ['0090101'], fa);
       document.getElementById('0090101').value = 0
   
     renderCI('subDer0', task, 6, [], ['41491004', '41491004'],
       ['POR LA AUTORIZACIÓN PARA LA FUSIÓN DE PREDIOS',
         'POR LA AUTORIZACIÓN PARA SUBDIVISIÓN, LOTIFICACIÓN Y RELOTIFICACIÓN DE PREDIOS'
       ],
       ['0090106', '0090107'], fa);
       document.getElementById('0090106').value = 0
       document.getElementById('0090107').value = 0

     renderCI('subCop0', task, 6, [], ['41491004', '41491004'],
       ['CONSTANCIAS',
        'CERTIFICACIONES'
       ],
       ['0090701', '0090702'], fa);
       document.getElementById('0090701').value = 0
       document.getElementById('0090702').value = 0
  
     renderCI('subCop1', task, 6, [], ['41491004', '41491004'],
       ['DUPLICADOS Y COPIAS',
         'OTROS SERVICIOS'
       ],
       ['0090703', '0090704'], fa);
       document.getElementById('0090703').value = 0
       document.getElementById('0090704').value = 0

     renderCI('subCop2', task, 6, [], ['41491004', '41491004'],
       ['PRO-BOMBEROS Y PROTECCION CIVIL',
         'LICENCIAS PARA CONSTRUCCIÓN DE EDIFICIOS O CASAS HABITACIÓN, RESTAURACIÓN O REPARACIÓN, URBANIZACIÓN, FRACCIONAMIENTO LOTIFICACIÓN, RELOTIFICACIÓN, FUSIÓN Y SUB-DIVISIÓN'
       ],
       ['00913', '0091301'], fa);
       document.getElementById('00913').value = 0
       document.getElementById('0091301').value = 0

     renderCI('subPro0', [0], 12, [], ['41491005'],
       ['VENTAS DE FORMAS IMPRESAS POR JUEGOS (FORMA 3DCC)'],
       ['0010804'], fa);
       document.getElementById('0010804').value = 0

     renderCI('subApr0', [0], 12, [], ['41621006'],
       ['MULTAS FISCALES (FALTA DE CUMPLIMIENTO DE OBLIGACIONES FISCALES)'],
       ['0010101'], fa);
       document.getElementById('0010101').value = 0

     renderCI('subDee0', [0], 12, [], [''],
       ['15% DE CONTRIBUCIÓN ESTATAL (APLICADO POR AUTORIZACIÓN DE FUSIÓN Y SUBDIVISIÓN DE PREDIOS)'],
       ['21173001001'], fa);
       document.getElementById('21173001001').value = 0
}