let chrom1 = require('./data/1.json');
let chrom2 = require('./data/2.json');
let chrom3 = require('./data/3.json');
let simpleData = require('./data/22.json');

let dataObj = {
  '1': chrom1,
  '2': chrom2,
  '3': chrom3,
};

module.exports = function getData (req, res) {
	let chrom = req.params.chrom;
	let data = dataObj[chrom] || simpleData;
  res.send(data);
};
