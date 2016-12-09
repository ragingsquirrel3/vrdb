var fetch = require('node-fetch');
let simpleData = require('./data/22.json');

const BASE_URL = 'http://1kgenome.exascale.info/3d?m=normal&chr=';
const SUFFIX = '&xstart=0&xend=15&zstart=0&zend=15&ystart=0&yend=15';


module.exports = function getData (req, res) {
  let chrom = req.params.chrom;
  let url = BASE_URL + chrom + SUFFIX;
  // fetch from 1k genome
  fetch(url)
    .then(function(apiRes) {
      return apiRes.text();
    }).then(function(body) {
      let clean = body.replace(/\(|\)/g,'');
      return res.send(clean);
    });

  // let data = dataObj[chrom] || simpleData;
  // res.send(data);
};
