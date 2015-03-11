#! /usr/bin/env node

var opts = require("nomnom").parse();
var words = require('sowpods');

function search(term) {
  term = term.toUpperCase();
  if (!(/^[A-Z]\d+[A-Z]$/.test(term))) {
    return;
  }
  var first = term[0];
  var last = term[term.length - 1];
  var num = parseInt(term.substr(1, term.length - 2), 10);
  var re = new RegExp("^" + first + "[A-Z]{" + num + "}" + last + "$");
  return words.filter(function (word) {
    return re.test(word);
  });
}

process.stdout.write(search(opts[0]).join('\n'));
