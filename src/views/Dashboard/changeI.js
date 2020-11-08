import renderCI from "./renderCI";
function redondeo(n){
//n = Math.round(n * 100) / 100;
//n = Math.round(n * 10) / 10;
n = Math.round(n);
return n;
}
export default (id,c) => {
  const task = [0, 1];
  if (id === '0070203'){
    const I0020801 = document.getElementById('I0020801');
    const V0020801 = document.getElementById('0020801');
    const I0020802 = document.getElementById('I0020802');
    const V0020802 = document.getElementById('0020802');
    const I0020803 = document.getElementById('I0020803');
    const V0020803 = document.getElementById('0020803');
    const I0020804 = document.getElementById('I0020804');
    const V0020804 = document.getElementById('0020804');
    V0020801.value=0
    V0020802.value=0
    V0020803.value=0
    V0020804.value=0
    if (I0020801.checked) {
      const I0020403 = document.getElementById('I0020403');
      const checkeds = I0020403.checked ? [0] : []
        renderCI('subIm1', task,6, checkeds, ['41121001', '41121001'],
          ['RUSTICOS EDIFICADOS DESTINADOS A CASA HABITACION',
            'PENSIONADOS Y JUBILADOS'
          ], ['0020403', '0020801'], c);      
    }

    if (I0020802.checked || I0020803.checked) {
      renderCI('subIm2', task, 6, [], ['41121001', '41121001'],
        ['INSEN',
          'PERSONAS DE CAPACIDADES DIFERENTES'
        ], ['0020802', '0020803'], c);
    }

    if (I0020804.checked) {
      const I0030101 = document.getElementById('I0030101');
      const checkeds = I0030101.checked?[1]:[]
      renderCI('subIm3', task, 6, checkeds, ['41121001', '41131001'],
        ['MADRES Y/O PADRES SOLTEROS JEFES DE FAMILIA',
          'SOBRE ADQUISICIONES DE BIENES INMUEBLES'
        ], ['0020804', '0030101'], c);
    }
    let d = c.state.currentD
    const bg = document.getElementById('baseGravable');
    const vi = document.getElementById(id);
    if (d.getMonth() === 0) {
      let pb = bg.value * 0.004;
      pb = Math.round(pb)
      pb *= 0.12
      pb = Math.round(pb)
      vi.value = -pb
    } else if (d.getMonth() === 1) {
      let pb = bg.value * 0.004;
      pb = Math.round(pb)
      pb *= 0.10
      pb = Math.round(pb)
      vi.value = -pb
    } else if (d.getMonth() === 2) {
      let pb = bg.value * 0.004;
      pb = Math.round(pb)
      pb *= 0.08
      pb = Math.round(pb)
      vi.value = -pb
    }
  }
  if (id === '0020801' || id === '0020802' || id === '0020803' || id === '0020804') {
    const V0020801 = document.getElementById('0070203');
    V0020801.value = 0
    renderCI('subAcc1', task, 6, [0], ['41171001', '41171001'],
      ['15% PRO CAMINOS', 'DESCUENTO PREDIAL DE NATURALEZA DEUDORA'],
      ['0070202', '0070203'], c);
    const I0020801 = document.getElementById('I0020801');
    const I0020802 = document.getElementById('I0020802');
    const I0020803 = document.getElementById('I0020803');
    const I0020804 = document.getElementById('I0020804');

    if (I0020801.checked && id !== '0020801') {
      const I0020403 = document.getElementById('I0020403');
      const checkeds = I0020403.checked ? [0] : []
      const V0020801 = document.getElementById('0020801');
      V0020801.value=0
      renderCI('subIm1', task, 6, checkeds, ['41121001', '41121001'],
        ['RUSTICOS EDIFICADOS DESTINADOS A CASA HABITACION',
          'PENSIONADOS Y JUBILADOS'
        ], ['0020403', '0020801'], c);
    }

    if ((I0020802.checked && id !== '0020802') || (I0020803.checked && id !== '0020803')) {
      const V0020802 = document.getElementById('0020802');
      const V0020803 = document.getElementById('0020803');
      //const I0020802 = document.getElementById('I0020802');
      V0020802.value = 0
      V0020803.value = 0
      const checkeds = (I0020803.checked && id === '0020802') ? [0] : ((I0020802.checked && id === '0020803') ? [1] : [])
      renderCI('subIm2', task, 6, checkeds, ['41121001', '41121001'],
        ['INSEN',
          'PERSONAS DE CAPACIDADES DIFERENTES'
        ], ['0020802', '0020803'], c);
    }

    if (I0020804.checked && id !== '0020804') {
      const I0030101 = document.getElementById('I0030101');
      const checkeds = I0030101.checked ? [1] : []
      const V0020804 = document.getElementById('0020804');
      V0020804.value = 0
      renderCI('subIm3', task, 6, checkeds, ['41121001', '41131001'],
        ['MADRES Y/O PADRES SOLTEROS JEFES DE FAMILIA',
          'SOBRE ADQUISICIONES DE BIENES INMUEBLES'
        ], ['0020804', '0030101'], c);
    }
    const bg = document.getElementById('baseGravable');
    const vi = document.getElementById(id);
    let pb = bg.value * 0.004;
    pb = Math.round(pb)
    pb *= 0.50
    pb = Math.round(pb)
    vi.value = -pb
  }
  if (id === '0030101') {
    const bg = document.getElementById('baseGravable');
    let pb = bg.value * 0.02 //* 0.70;
    let pq = pb * 0.15 //* 0.70;
    pb = Math.round(pb)
    const vi = document.getElementById(id);
    vi.value = pb //* 2
    const d = c.state.currentD
    const m = d.getMonth()
    let mul = 1.5
    if (m > 1 && m < 6) {
      mul = 2
    } else if (m > 5 && m < 12) {
      mul = 3
    }
    const I0020401 = document.getElementById("I0020401");
    if (I0020401.checked){
      const viU = document.getElementById("0020401");
      viU.value = Math.round(pb / mul)
    }else{
      const viR = document.getElementById("0020403");
      viR.value = Math.round(pb / mul)
    }
    const viQ1 = document.getElementById("0070201");
    viQ1.value = Math.round(pq / mul);
    const viQ2 = document.getElementById("0070202");
    viQ2.value = Math.round(pq / mul);
    const viD = document.getElementById("0070203");
    viD.value = 0;
    const checkeds = [0]
    renderCI('subAcc1', task, 6, checkeds, ['41171001', '41171001'],
      ['15% PRO CAMINOS',
        'DESCUENTO PREDIAL DE NATURALEZA DEUDORA'
      ], ['0070202', '0070203'], c);
      
    if (!c.esAlta && !c.state.readOnly) {
      const dateUpL = document.getElementById('dateUp');
      const regB = document.getElementById('regB');
      c.oldDateUpL = dateUpL.value
      c.oldIdOrden = c.idOrden
      c.oldCurrentD = c.state.currentD
     // dateUpL.value = '';
      regB.innerHTML = 'GENERAR ORDEN DE PAGO';
      c.idOrden = 0;
     // c.state.currentD = new Date()
    }
  }
  
  if (id === '0090702') {  
    const bg = document.getElementById('baseGravable');
    const vi = document.getElementById(id);
    
    if(bg.value<10792){
      vi.value=193
    }
    if(bg.value>10791&&bg.value<21583){
      vi.value=483
    }
    if(bg.value>21582&&bg.value<43165){
      vi.value=964
    }
    if(bg.value>43164&&bg.value<86329){
      vi.value=1449
    }
    if(bg.value>86328){
      vi.value=1932
    }

  }
}