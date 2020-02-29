import renderCI from "./renderCI";

export default (c,v) => {
  v = v.split(' ').join('')
  const rezago = document.getElementById('0090101');
  let p = v.split(',')
  let x = 0
  let checkeds = []
  rezago.value=0
  if(p.length>1){
    let i = 0
    while (i<p.length){
      const subP = p[i].split('-')
      const dif = parseInt(subP[1]) - parseInt(subP[0])
      x+=dif
      i++
    }
  }else{
    p = v.split('-')
    if(p.length>1){
      x = parseInt(p[1]) - parseInt(p[0])
    }
  }
  if (x > 0) {
    const bg = document.getElementById('baseGravable');
    let pb = bg.value * 0.004;
    pb = Math.round(pb)
    let pro1 = pb * 0.15;
    pro1 = Math.round(pro1)
    let pro2 = pro1;
    pro2 = Math.round(pro2)
    let t = pb + pro1 + pro2
    t *= x
    t = Math.round(t)
    rezago.value=t
    checkeds = [0]
  }
  renderCI('subAcc2', [0], 6, checkeds, ['41191001'],
    ['REZAGOS IMPUESTO PREDIAL'],
    ['0090101'], c);
  
}