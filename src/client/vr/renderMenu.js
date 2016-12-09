/*eslint-disable quotes */
const AFRAME = window.AFRAME;
import writeSceneToDOM from './writeSceneToDOM';

const START_ROTATION = 220;
const START_Y = 2.5;
const MAX_ROTATION = 120;
const ROTATION_DELTA = 35;
const Y_DELTA = 2.5;

// selectCb(id)
export default function draw () {
  let data = [
    { id: '1', imgSrc: 'https://s3.amazonaws.com/vrdb/shots/chr_1.png', name: 'chr1' }
  ];
  // make assets HTML
  let assetsStr = data.reduce( (current, d) => {
    let thisHtml = `<img id='shot${d.id}' src='${d.imgSrc}' crossorigin='anonymous'>`;
    current += thisHtml;
    return current;
  }, '');

  // make HTML string from data
  let rotation = START_ROTATION;
  let y = START_Y;
  let menuStr = data.reduce( (current, d) => {
    // src='#shot${d.id}' height='2.0'
    let imgHtml = `
      <a-entity position='0 ${y} 0'>
        <a-curvedimage
          class='clickable'
          src='#shot${d.id}' height='2.0'
          radius='5.7' theta-length='25'
          rotation='0 ${rotation} 0'
          data-location='${d.id}'
          set-location
          event-set__1="_event: mouseenter; scale: 1.2 1.2 1; position: 0.25 0 0;"
          event-set__2="_event: mouseleave; scale: 1 1 1; position: 0 0 0;"
          sound="on: click; src: #click-sound"
          update-raycaster="#cursor"
        >
        </a-curvedimage>
      </a-entity>
    `;
    current += imgHtml;
    rotation -= ROTATION_DELTA;
    if (rotation < MAX_ROTATION) {
      rotation = START_ROTATION;
      y -= Y_DELTA;
    }
    return current;
  }, '');

  // actually render to HTML
  let assetEl = document.getElementById('dynamicAssets');
  let cameraEl = document.getElementById('cameraTarget');
  assetEl.innerHTML = assetsStr;
  writeSceneToDOM(menuStr);
  cameraEl.innerHTML = getCameraHtml();
}

function getCameraHtml () {
  return `
    <a-entity camera look-controls>
      <a-cursor id="cursor"
          material="color: white; shader: flat"
          animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
          event-set__1="_event: mouseenter; color: springgreen"
          event-set__2="_event: mouseleave; color: white"
          raycaster="objects: .clickable"
          fuse='true' fuseTimeout='2000'
      >
      </a-cursor>
    </a-entity>
  `;
}
