//import renderCI from "./renderCI";
function red(n) {
  //n = Math.round(n * 100) / 100;
  //n = Math.round(n * 10) / 10;
  n = Math.round(n);
  return n;
}
export default (c) => {
  let t = 0
  let V0020401 = document.getElementById('0020401')
  V0020401.value = V0020401.value === '' ? 0 : V0020401.value
  let V0020402 = document.getElementById('0020402')
  V0020402.value = V0020402.value === '' ? 0 : V0020402.value
  let V0020403 = document.getElementById('0020403')
  V0020403.value = V0020403.value === '' ? 0 : V0020403.value
  let V0020801 = document.getElementById('0020801')
  V0020801.value = V0020801.value === '' ? 0 : V0020801.value
  let V0020802 = document.getElementById('0020802')
  V0020802.value = V0020802.value === '' ? 0 : V0020802.value
  let V0020803 = document.getElementById('0020803')
  V0020803.value = V0020803.value === '' ? 0 : V0020803.value
  let V0020804 = document.getElementById('0020804')
  V0020804.value = V0020804.value === '' ? 0 : V0020804.value
  let V0030101 = document.getElementById('0030101')
  V0030101.value = V0030101.value === '' ? 0 : V0030101.value
  let V0070101 = document.getElementById('0070101')
  V0070101.value = V0070101.value === '' ? 0 : V0070101.value
  let V0070201 = document.getElementById('0070201')
  V0070201.value = V0070201.value === '' ? 0 : V0070201.value
  let V0070202 = document.getElementById('0070202')
  V0070202.value = V0070202.value === '' ? 0 : V0070202.value
  let V0070203 = document.getElementById('0070203')
  V0070203.value = V0070203.value === '' ? 0 : V0070203.value
  let V0090101 = document.getElementById('0090101')
  V0090101.value = V0090101.value === '' ? 0 : V0090101.value
  let V0090106 = document.getElementById('0090106')
  V0090106.value = V0090106.value === '' ? 0 : V0090106.value
  let V0090107 = document.getElementById('0090107')
  V0090107.value = V0090107.value === '' ? 0 : V0090107.value
  let V0090701 = document.getElementById('0090701')
  V0090701.value = V0090701.value === '' ? 0 : V0090701.value
  let V0090702 = document.getElementById('0090702')
  V0090702.value = V0090702.value === '' ? 0 : V0090702.value
  let V0090703 = document.getElementById('0090703')
  V0090703.value = V0090703.value === '' ? 0 : V0090703.value
  let V0090704 = document.getElementById('0090704')
  V0090704.value = V0090704.value === '' ? 0 : V0090704.value
  let V00913 = document.getElementById('00913')
  V00913.value = V00913.value === '' ? 0 : V00913.value
  let V0091301 = document.getElementById('0091301')
  V0091301.value = V0091301.value === '' ? 0 : V0091301.value
  let V0010804 = document.getElementById('0010804')
  V0010804.value = V0010804.value === '' ? 0 : V0010804.value
  let V0010101 = document.getElementById('0010101')
  V0010101.value = V0010101.value === '' ? 0 : V0010101.value
  let V21173001001 = document.getElementById('21173001001')
  V21173001001.value = V21173001001.value === '' ? 0 : V21173001001.value
  t += parseInt(V0020401.value)
  t += parseInt(V0020402.value)
  t += parseInt(V0020403.value)
  t += parseInt(V0020801.value)
  t += parseInt(V0020802.value)
  t += parseInt(V0020803.value)
  t += parseInt(V0020804.value)
  t += parseInt(V0030101.value)
  t += parseInt(V0070101.value)
  t += parseInt(V0070201.value)
  t += parseInt(V0070202.value)
  t += parseInt(V0070203.value)
  t += parseInt(V0090101.value)
  t += parseInt(V0090106.value)
  t += parseInt(V0090107.value)
  t += parseInt(V0090701.value)
  t += Math.round((parseInt(V0090701.value)*0.15))*2
  t += parseInt(V0090702.value)
  t += Math.round((parseInt(V0090702.value)*0.15))*2
  t += parseInt(V0090703.value)
  t += Math.round((parseInt(V0090703.value)*0.15))*2
  t += parseInt(V0090704.value)
  t += Math.round((parseInt(V0090704.value)*0.15))*2
  t += parseInt(V00913.value)
  t += parseInt(V0091301.value)
  t += parseInt(V0010804.value)*72
  t += parseInt(V0010101.value)
  t += parseInt(V21173001001.value)
  c.setState({totalN: red(t)})
}