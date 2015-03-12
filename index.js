#! /usr/bin/env node

var opts = require("nomnom").parse();
var words = require('sowpods');

var patternRe = /^[A-Za-z]\d+[A-Za-z]$/;
var wordRe = /^[a-zA-Z]{3,}$/;

function search(term) {
  term = term.toUpperCase();
  var first = term[0];
  var last = term[term.length - 1];
  var num = parseInt(term.substr(1, term.length - 2), 10);
  var re = new RegExp("^" + first + "[A-Z]{" + num + "}" + last + "$");
  return words.filter(function (word) {
    return re.test(word);
  });
}

var arg = opts[0];

if (wordRe.test(arg)) {
  console.log(arg[0] + (arg.length - 2) + arg[arg.length - 1]);
} else if (patternRe.test(arg)) {
  var words = search(arg).map(function (word) {
    return word.toLowerCase();
  });
  console.log(words.join('\n'));
} else {
  console.log('a9r - the abbreviator\n');
  console.log('finds words that match <letter><num><letter> patterns');
  console.log('Example: a9r matches "ABBREVIATOR"');
  console.log('usage: a9r <pattern>');
}
