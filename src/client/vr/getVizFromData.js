/*eslint-disable indent, quotes */
const THREE = window.THREE;
const COLOR = '#4390bc';
const RADIUS = 0.025;
const SPHERE_SEGMENTS = 5;

import processData from './processData';

// make HTML string from data
export default function getVizFromData (rawData) {
  let data = processData(rawData);
  let reducedStr = data.reduce( (current, d, i) => {
    let spherePos = `${d.x} ${d.y} ${d.z}`;
    let cylinderHtml = '';
    if (i !== 0) {
      let prevD = data[i - 1];
      let distance = calcDistance(d, prevD);
      let mid = calcMid(d, prevD);
      let midPos = `${mid.x} ${mid.y} ${mid.z}`;
      cylinderHtml = `
        <a-entity position='${midPos}' look-at='${spherePos}'>
          <a-cylinder
            radius=${RADIUS} height=${distance}
            rotation='90 0 0' color='${COLOR}'
            segments-radial='8'
            id='seg${d.id}'
            data-id='${d.id}'
            highlight
            sound='on: click; src: #click-sound'
            update-raycaster="#cursor"
            class='clickable'
          >
          </a-cylinder>
        </a-entity>
      `;
    }
    let sphereHtml = `
      <a-sphere
        radius=${RADIUS} position='${spherePos}'
        segments-width='{SPHERE_SEGMENTS}' segments-height='{SPHERE_SEGMENTS}'
        color=${COLOR} 
      >
      </a-sphere>`;
    let thisHtml = cylinderHtml;
    current += thisHtml;
    return current;
  }, '');

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
