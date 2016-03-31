var fs = require('fs');
var certificateModule = {};

(function(){
  "use strict";

  var _eventModel = require("../models/event");
  var _userModel = require("../models/user");
  var _certificateModel = require("../models/certificate");

  var generate = function (certificateData) {
    _userModel.findOne({_id:certificateData._user}, function(err, userData) {
      _eventModel.findOne({_id:certificateData._event}, function(err, eventData) {
        generatePdf({
          certificate: certificateData._id,
          name: userData.name,
          date: eventData.certificate_date_text,
          description: eventData.certificate_description
        });
      });
    });
  };

  var generatePdf = function (data) {
    let jade = require('jade');
    let pdf = require('html-pdf');

    // let data = {
    //   name: "FERNANDO FABRICIO DOS SANTOS",
    //   date: "Maringá, 19 de Março de 2016.",
    //   description: "Participou do MEETUP #2 DevParaná - Maringá, evento realizado na UniCesumar iniciando as 14 horas do dia 19 de Março de 2016, totalizando 4 horas de evento."
    // };

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
      stream.pipe(fs.createWriteStream('./tmp/pdf/'+data.certificate+'.pdf'));
    });

    _certificateModel.update({_id: data.certificate}, {emmited: true}, function(err, data){
      console.log(data);
    });
  };

  certificateModule = {
    generate: generate
  };

  if (typeof module !== 'undefined' && module.exports) {
      module.exports = certificateModule;
  }
})();
