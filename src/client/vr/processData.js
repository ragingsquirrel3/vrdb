import _ from 'underscore';
import d3 from 'd3';

const MAX_COORD = 10;
const POS_ADJUSTMENT = 1;
const Z_ADJUSTMENT = -3;
const MAX_NODES = 750;

export default function processData (raw) {
  let strands = raw.map( d => {
    return d[1];
  });
  let strandWithPoints = strands.map( s => {
    let pointArr = s.map( d => {
      return {
        x: d[2] - POS_ADJUSTMENT,
        y: d[3] - POS_ADJUSTMENT,
        z: d[4] - POS_ADJUSTMENT + Z_ADJUSTMENT
      };
    });
    return pointArr;
  });
  let mergedPoints = [].concat.apply([], strandWithPoints);

  // sanitize the data to expand and allow the user to 'look around'
  console.log(mergedPoints.length);
  let min = getMinCoord(_.min(mergedPoints, getMinCoord));
  let max = getMaxCoord(_.max(mergedPoints, getMaxCoord));
  let scale = d3.scale.linear()
    .domain([min, max])
    .range([-1 * MAX_COORD, MAX_COORD]);
  let data = mergedPoints.map( (d, i) => {
    return {
      x: scale(d.x) - MAX_COORD / 2,
      y: scale(d.y) - MAX_COORD / 2,
      z: scale(d.z) + MAX_COORD / 3,
      id: i
    }
  });
  return data.slice(0, MAX_NODES);
}


function getMaxCoord(d) {
  return Math.max(d.x, d.y, d.z);
}

function getMinCoord(d) {
  return Math.min(d.x, d.y, d.z);
}
