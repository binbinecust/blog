const fs = require('fs');
const path = require('path');
let text = fs.readFileSync(__dirname + '/res.md', 'utf8');
// let res = text.match(/<ul class="thumbnail-rowgrid.*^(<div class="thumbnail-premium-sponsor">)/g);
let replace = text.replace(/?=(<ul class="thumbnail-rowgrid(.*))/g, $1)
console.log(replace)