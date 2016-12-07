/*eslint-disable indent, quotes */
const THREE = window.THREE;
const COLOR = '#FFFFFF';
const RADIUS = 0.05;

import processData from './processData';

// make HTML string from data
export default function getVizFromData (rawData) {
  let data = processData(rawData);
  let reducedStr = data.reduce( (current, d, i) => {
    let cylinderHtml = '';
    if (i !== 0) {
      let prevD = data[i - 1];
      let distance = calcDistance(d, prevD);
      let lookPos = `${d.x} ${d.y} ${d.z}`;
      let r = calcRotation(prevD, d);
      let mid = calcMid(d, prevD);
      let midPos = `${prevD.x} ${prevD.y} ${prevD.z}`;
      cylinderHtml = `
        <a-entity
          geometry='
            primitive: cylinder;
            radius: ${RADIUS};
            height: ${distance};
            open-ended: true;
            segments-radial: 8;
            buffer: false; skipCache: true; mergeTo: #baseCylinder'
          position='${midPos}'
          rotation='${r}'
          visible='true'
        >
        </a-entity>
      `;
    }
    let thisHtml = cylinderHtml;
    current += thisHtml;
    return current;
  }, getBaseCylinder());

  return reducedStr;
}

function calcDistance(a, b) {
  let dx = a.x - b.x;
  let dy = a.y - b.y;
  let dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function calcMid(a, b) {
  let mX = mean(a.x, b.x);
  let mY = mean(a.y, b.y);
  let mZ = mean(a.z, b.z);
  return {
    x: mX,
    y: mY,
    z: mZ
  };
}

function mean(a, b) {
  return (a + b) / 2;
}

  function calcRotation(a, b) {
    let v1 = new THREE.Vector3(0, 1, 0);
    let v2 = new THREE.Vector3(b.x - a.x, b.y - a.y, b.z - a.z).normalize();
    let quaternion = new THREE.Quaternion().setFromUnitVectors(v1, v2);
    let euler = new THREE.Euler().setFromQuaternion(quaternion);
    let xAngle = (euler.x * 180 / Math.PI);
    let yAngle = (euler.y * 180 / Math.PI);
    let zAngle = (euler.z * 180 / Math.PI);
    console.log(`${xAngle} ${yAngle} ${zAngle}`);
    return `${xAngle} ${yAngle} ${zAngle}`;
  }


function getBaseCylinder () {
  return `
    '<a-entity id='baseCylinder' geometry='primitive: cylinder; buffer: false; skipCache: true' material='color: ${COLOR}'></a-entity>
  `;
}
