import renderCI from "./renderCI";
function redondeo(n){
//n = Math.round(n * 100) / 100;
//n = Math.round(n * 10) / 10;
n = Math.round(n);
return n;
}
export default (c) => {
  const I0020801 = document.getElementById("I0020801");
  const I0020802 = document.getElementById("I0020802");
  const I0020803 = document.getElementById("I0020803");
  const I0020804 = document.getElementById("I0020804");
  const I0030101 = document.getElementById("I0030101").checked;
  const checkU = document.getElementById('check0');
  const bg = document.getElementById('baseGravable');
  const prol1 = document.getElementById('0070201');
  const prol2 = document.getElementById('0070202');
  const task = [0, 1];
  //bg.value = redondeo(bg.value)
  //let subStr = bg.value.split(".");
  //bg.value=parseInt(subStr[0]);
  let pb = bg.value * 0.004;
  pb = redondeo(pb)
  //pb = parseInt(subStr[0]);
  let pro1 = pb * 0.15;
  pro1 = redondeo(pro1)
  //subStr = pro1.toString().split(".");
  //pro1 = parseInt(subStr[0]);
  const pro2 = pro1;
  let t = pb + pro1 + pro2;
  
  if (checkU.checked){
    const urb = document.getElementById('0020401');
    const rus = document.getElementById('0020403');
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
    renderCI('subIm0', task, 6, [], ['41121001', '41121001'],
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

  let checkeds = [0]
  if ((!I0020801.checked && !I0020802.checked &&
      !I0020803.checked && !I0020804.checked) && !I0030101) {
    let d = c.state.currentD
    const vi = document.getElementById('0070203')
    if(d.getMonth()===0){
      pb = pb * 0.12
      pb = redondeo(pb)
      vi.value = -pb
      t-=pb
      checkeds = [0,1]
    }else
    if(d.getMonth()===1){
      pb = pb * 0.10
      pb = redondeo(pb)
      vi.value = -pb
      t-=pb
      checkeds = [0,1]
    }else
    if(d.getMonth()===2){
      pb = pb * 0.08
      pb = redondeo(pb)
      vi.value = -pb
      t-=pb
      checkeds = [0,1]
    }
  }else if(I0030101){
    const bg = document.getElementById('baseGravable');
    let pb = bg.value * 0.004 //* 0.70;
    let pq = pb * 0.15 //* 0.70;
    pb = Math.round(pb)
    const vi = document.getElementById('0030101');
    vi.value = pb * 2
    const d = c.state.currentD
    const m = d.getMonth()
    //console.log(`month: ${m}`)
    let mul = 1.5
    if (m > 1 && m < 6) {
      mul = 2
    } else if (m > 5 && m < 12) {
      mul = 3
    }
    const I0020401 = document.getElementById("I0020401");
    if (I0020401.checked) {
      const viU = document.getElementById("0020401");
      viU.value = Math.round(pb / mul)
    } else {
      const viR = document.getElementById("0020403");
      viR.value = Math.round(pb / mul)
    }
    const viQ1 = document.getElementById("0070201");
    viQ1.value = Math.round(pq / mul);
    const viQ2 = document.getElementById("0070202");
    viQ2.value = Math.round(pq / mul);
    const viD = document.getElementById("0070203");
    viD.value = 0;
  }
  renderCI('subAcc1', task, 6, checkeds, ['41171001', '41171001'],
    ['15% PRO CAMINOS',
      'DESCUENTO PREDIAL DE NATURALEZA DEUDORA'
    ], ['0070202', '0070203'], c);

   // c.setState({totalN: t})
}