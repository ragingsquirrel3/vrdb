/*eslint-disable indent, quotes */
import _ from 'underscore';
const THREE = window.THREE;
const COLOR = '#FFFFFF';
const RADIUS = 0.025;

const BASE_URL = '/api';
const HIGH_COLOR = '#EF6F3D';

import getVizFromData from './getVizFromData';
import writeSceneToDOM from './writeSceneToDOM';

export default function draw (chromNum, options) {
  console.log('viewing ', chromNum);
  // only do this once
  let _render = _.once(render);
  // connect to socket
  let socket = window.socket;
  // join chrom 'room'
  socket.emit('subscribe', chromNum);
  // listen for highlighting
  socket.on('highlight', (d) => {
    $(`#seg${d}`).dblclick();
    console.log('someone highlighted ', d);
    let domId = `seg${d}`;
    let el  = document.getElementById(domId);
    if (el) el.setAttribute('color', HIGH_COLOR);
  });

  let url = `${BASE_URL}/${chromNum}`;
  $.ajax({
    dataType: 'json',
    url: url,
    success: (data) => {
      _render(data.data);
    }
  });
}

function render(data) {
  let vizStr = getVizFromData(data);
  let sceneHTML = vizStr + getMenuSelector();
  let cameraEl = document.getElementById('cameraTarget');
  cameraEl.innerHTML = getCameraHtml();
  writeSceneToDOM(sceneHTML);
}

function getMenuSelector() {
  return `
    <a-box
      src='#tile' position='0 -2 -2' rotation='45 0 0'
      height='0.5' width='0.5' depth='0.5' view-menu
      event-set__1="_event: mouseenter; scale: 1.2 1.2 1.2"
      event-set__2="_event: mouseleave; scale: 1 1 1"
    ></a-box>
  `;
}

function getCameraHtml () {
  return `
    <a-entity camera look-controls wasd-controls>
      <a-cursor id="cursor"
          material="color: white; shader: flat"
          animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
          animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
          event-set__1="_event: mouseenter; color: springgreen"
          event-set__2="_event: mouseleave; color: white"
          raycaster="objects: .clickable"
      >
      </a-cursor>
    </a-entity>
  `;
}
