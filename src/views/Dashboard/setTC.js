import renderCI from "./renderCI";
function redondeo(n) {
  //n = Math.round(n * 100) / 100;
  //n = Math.round(n * 10) / 10;
  n = Math.round(n);
  return n;
}
export default (n,c) => {
  const checkU = document.getElementById('check0');
  const bg = document.getElementById('baseGravable');
  let m1 = document.getElementById('m1').value;
  const m2 = document.getElementById('m2').value;
  const zona = document.getElementById('zona').value;
  const prol1 = document.getElementById('0070201');
  const prol2 = document.getElementById('0070202');
  const task = [0, 1];
  //const p1 = m1 * m2;
  const tp = checkU.checked ? 'u' : 'r'
  if(tp==='r'){
    m1/=1000
  }
  let p1 = m1;
  let p2 = m2;
  let umaZ = 86.88 * zona;
  //umaZ = redondeo(umaZ);
  let umaC = 86.88 * n; 
  //umaC = redondeo(umaC);

  p1 = p1 * umaZ
  //p1=redondeo(p1);
  
  p2 = p2 * umaC
  //p2=redondeo(p2);
  
  bg.value=p1+p2;
  bg.value = redondeo(bg.value)
  let pb = bg.value * 0.004;
  //subStr = pb.toString().split(".");
  //pb = parseInt(subStr[0]);
  pb = redondeo(pb);
  let pro1 = pb * 0.15;
  //subStr = pro1.toString().split(".");
  //pro1 = parseInt(subStr[0]);
  pro1 = redondeo(pro1);
  const pro2 = pro1;
  const t = pb + pro1 + pro2;
  
  if (checkU.checked){
    const urb = document.getElementById('0020401');
    const rus = document.getElementById('0020403');
  //  const subIm0 = document.getElementById('subIm0');
  //  const subIm1 = document.getElementById('subIm1');
    urb.value = pb;
    rus.value = 0
    renderCI('subIm0',task,6,[0],['41121001','41121001'],
              ['URBANOS EDIFICADOS DESTINADOS A CASA HABITACION',
               'SUB URBANOS EDIFICADOS DESTINADOS A CASA HABITACION'
              ],['0020401','0020402'],c);
    renderCI('subIm1', task,6, [], ['41121001', '41121001'],
      ['RUSTICOS EDIFICADOS DESTINADOS A CASA HABITACION',
        'PENSIONADOS Y JUBILADOS'
      ], ['0020403', '0020801'], c);

  }else{
    const rus = document.getElementById('0020403');
    const urb = document.getElementById('0020401');
    rus.value = pb;
    urb.value = 0;
    renderCI('subIm1', task, 6, [0], ['41121001', '41121001'],
      ['RUSTICOS EDIFICADOS DESTINADOS A CASA HABITACION',
        'PENSIONADOS Y JUBILADOS'
      ], ['0020403', '0020801'], c);
    renderCI('subIm0', task, 6, [0], ['41121001', '41121001'],
      ['URBANOS EDIFICADOS DESTINADOS A CASA HABITACION',
        'SUB URBANOS EDIFICADOS DESTINADOS A CASA HABITACION'
      ], ['0020401', '0020402'], c);
  }

  prol1.value = pro1;
  prol2.value = pro2;
  renderCI('subAcc0', task, 6, [1], ['41171001', '41171001'],
    ['RECARGOS PREDIAL',
      '15% PRO EDUCACION Y ASISTENCIA SOCIAL'
    ], ['0070101', '0070201'], c);
  renderCI('subAcc1', task, 6, [0], ['41171001', '41171001'],
    ['15% PRO CAMINOS',
      'DESCUENTO PREDIAL DE NATURALEZA DEUDORA'
    ], ['0070202', '0070203'], c);
    c.setState({tc: n, totalN: t})
}