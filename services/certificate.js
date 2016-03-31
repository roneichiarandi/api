var fs = require('fs');
var certificateModule = {};

(function(){
  "use strict";

  var generatePdf = function () {
    let jade = require('jade');
    let pdf = require('html-pdf');

    let data = {
      name: "FERNANDO FABRICIO DOS SANTOS",
      date: "Maringá, 19 de Março de 2016.",
      description: "Participou do MEETUP #2 DevParaná - Maringá, evento realizado na UniCesumar iniciando as 14 horas do dia 19 de Março de 2016, totalizando 4 horas de evento."
    };

    let fn = jade.compileFile(__dirname + '/../views/certificate.jade', {});

    let html = fn(data);

    let options = {
      height: "210mm",
      width: "297mm",
      border: "0",
      type: "pdf",
      phantomPath: __dirname + "/../node_modules/phantomjs/bin/phantomjs",
      base: "/home/ffsantos/Documents/devparana/api/public/"
    };

    pdf.create(html, options).toStream(function(err, stream){
      stream.pipe(fs.createWriteStream('./foo.pdf'));
    });
  };

  certificateModule = {
    generate: generatePdf
  };

  if (typeof module !== 'undefined' && module.exports) {
      module.exports = certificateModule;
  }
})();
