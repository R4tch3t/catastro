import renderCI from "./renderCI";
export default (c) => {
  const checkU = document.getElementById('check0');
  const bg = document.getElementById('baseGravable');
  const prol1 = document.getElementById('0070201');
  const prol2 = document.getElementById('0070202');
  const task = [0, 1];

  let subStr = bg.value.split(".");
  bg.value=parseInt(subStr[0]);
  let pb = bg.value * 0.004;
  subStr = pb.toString().split(".");
  pb = parseInt(subStr[0]);
  let pro1 = pb * 0.15;
  subStr = pro1.toString().split(".");
  pro1 = parseInt(subStr[0]);
  const pro2 = pro1;
  const t = pb + pro1 + pro2;
  
  if (checkU.checked){
    const urb = document.getElementById('0020401');
    const rus = document.getElementById('0020403');
    urb.value = pb;
    rus.value = 0
    renderCI('subIm0',task,6,[0],['41121001','41121001'],
              ['URBANOS EDIFICADOS DESTINADOS A CASA HABITACION',
               'SUB URBANOS EDIFICADOS DESTINADOS A CASA HABITACION'
              ],['0020401','0020402'],c.addImpuesto);
    renderCI('subIm1', task,6, [], ['41121001', '41121001'],
      ['RUSTICOS EDIFICADOS DESTINADOS A CASA HABITACION',
        'PENSIONADOS Y JUBILADOS'
      ], ['0020403', '0020801'], c.addImpuesto);

  }else{
    const rus = document.getElementById('0020403');
    const urb = document.getElementById('0020401');
    rus.value = pb;
    urb.value = 0;
    renderCI('subIm1', task, 6, [0], ['41121001', '41121001'],
      ['RUSTICOS EDIFICADOS DESTINADOS A CASA HABITACION',
        'PENSIONADOS Y JUBILADOS'
      ], ['0020403', '0020801'], c.addImpuesto);
    renderCI('subIm0', task, 6, [0], ['41121001', '41121001'],
      ['URBANOS EDIFICADOS DESTINADOS A CASA HABITACION',
        'SUB URBANOS EDIFICADOS DESTINADOS A CASA HABITACION'
      ], ['0020401', '0020402'], c.addImpuesto);
  }

  prol1.value = pro1;
  prol2.value = pro2;
  renderCI('subAcc0', task, 6, [1], ['41171001', '41171001'],
    ['RECARGOS PREDIAL',
      '15% PRO EDUCACION Y ASISTENCIA SOCIAL'
    ], ['0070101', '0070201'], c.addImpuesto);
  renderCI('subAcc1', task, 6, [0], ['41171001', '41171001'],
    ['15% PRO CAMINOS',
      'DESCUENTO PREDIAL DE NATURALEZA DEUDORA'
    ], ['0070202', '0070203'], c.addImpuesto);
    c.setState({totalN: t})
}