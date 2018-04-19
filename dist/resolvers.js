'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (fetch) {
  global.fetch = fetch;

  return {
    searchResolve: function searchResolve(root, args, context) {
      var search_for = args.search_text;

      var exact_match = false;

      var rsd_datasource = new URL(_RsdMedia.HEROKU_RSD, _constants.SFFAUDIO_HEROKU);
      var rsd_data = _RsdMedia.RsdMedia.fetchRsd(rsd_datasource, search_for, _RsdMedia.RSD_SEARCH_FIELDS, exact_match);

      var pdf_datasource = new URL(_PdfMedia.HEROKU_PDF, _constants.SFFAUDIO_HEROKU);
      var pdf_data = _PdfMedia.PdfMedia.fetchPdf(pdf_datasource, search_for, _PdfMedia.PDF_SEARCH_FIELDS, exact_match);

      var sffaudio_datasource = new URL(_SffAudioMedia.HEROKU_PODCASTS, _constants.SFFAUDIO_HEROKU);
      var sffaudio_data = _SffAudioMedia.SffAudioMedia.fetchSffAudio(sffaudio_datasource, search_for, _SffAudioMedia.SFF_AUDIO_SEARCH_FIELDS, exact_match);

      var web_datasource = new URL(_constants.SFFAUDIO_ARTICLE_MENTIONS_PHP + '?search_text=' + search_for, _constants.SFFAUDIO_COM);
      var webpage_data = _WebPage.WebPage.fetchWebPages(web_datasource, '', [], exact_match);

      return _promise2.default.all([rsd_data, pdf_data, sffaudio_data, webpage_data]).then(function (values) {
        var non_empty = values.filter(function (match_array) {
          return match_array.length > 0 ? true : false;
        });
        var object_list = non_empty.reduce(function (accumulator, currentValue) {
          return accumulator.concat(currentValue);
        }, []);
        var json_list = object_list.map(function (obj) {
          return obj.propertiesToJson();
        });
        return json_list;
      });
    },

    pageResolve: function pageResolve(root, args, context) {
      var search_for = void 0,
          search_fields = void 0,
          exact_match = void 0;

      if (typeof args.get_page === 'undefined') {
        search_fields = [];
        search_for = '';
        exact_match = false;
      } else {
        search_fields = ['ID'];
        search_for = args.get_page;
        exact_match = true;
      }
      var page_datasource = new URL(_constants.SFFAUDIO_ARTICLE_MENTIONS_PHP, _constants.SFFAUDIO_COM);

      console.log('page_datasource', page_datasource);
      var page_records = _WebPage.WebPage.fetchWebPages(page_datasource, search_for, search_fields, exact_match).then(function (content_objects) {
        return _SiteContent.SiteContent.contentToJson(content_objects);
      });
      return page_records;
    },

    rsdResolve: function rsdResolve(root, args, context) {
      var search_for = void 0,
          search_fields = void 0,
          exact_match = void 0;

      if (typeof args.get_rsd === 'undefined') {
        search_fields = [];
        search_for = '';
        exact_match = false;
      } else {
        search_fields = ['episode number'];
        search_for = args.get_rsd;
        exact_match = true;
      }
      var rsd_datasource = new URL(_RsdMedia.HEROKU_RSD, _constants.SFFAUDIO_HEROKU);
      var rsd_records = _RsdMedia.RsdMedia.fetchRsd(rsd_datasource, search_for, search_fields, exact_match).then(function (content_objects) {
        return _SiteContent.SiteContent.contentToJson(content_objects);
      });
      return rsd_records;
    },

    pdfResolve: function pdfResolve(root, args, context) {
      var search_for = void 0,
          search_fields = void 0,
          exact_match = void 0;

      if (typeof args.get_pdf === 'undefined') {
        search_fields = [];
        search_for = '';
        exact_match = false;
      } else {
        search_fields = ['episode number'];
        search_for = args.get_pdf;
        exact_match = true;
      }
      var pdf_datasource = new URL(_PdfMedia.HEROKU_PDF, _constants.SFFAUDIO_HEROKU);
      var pdf_records = _PdfMedia.PdfMedia.fetchPdf(pdf_datasource, search_for, search_fields, exact_match).then(function (content_objects) {
        return _SiteContent.SiteContent.contentToJson(content_objects);
      });
      return pdf_records;
    },

    sffAudioResolve: function sffAudioResolve(root, args, context) {
      var search_for = void 0,
          search_fields = void 0,
          exact_match = void 0;

      if (typeof args.get_sffaudio === 'undefined') {
        search_fields = [];
        search_for = '';
        exact_match = false;
      } else {
        search_fields = ['episode number'];
        search_for = args.get_sffaudio;
        exact_match = true;
      }
      var sffaudio_datasource = new URL(_SffAudioMedia.HEROKU_PODCASTS, _constants.SFFAUDIO_HEROKU);
      var sffaudio_records = _SffAudioMedia.SffAudioMedia.fetchSffAudio(sffaudio_datasource, search_for, search_fields, exact_match).then(function (content_objects) {
        return _SiteContent.SiteContent.contentToJson(content_objects);
      });
      return sffaudio_records;
    },

    resolveContent: function resolveContent(content_object) {
      if (content_object.article_post) {
        return 'ArticlePage';
      }
      if (content_object.mention_post) {
        return 'MentionPage';
      }
      if (content_object.sffaudio_post) {
        return 'SffAudioMedia';
      }
      if (content_object.rsd_post) {
        return 'RsdMedia';
      }
      if (content_object.issues) {
        return 'PdfMedia';
      }
      return null;
    }

  };
};

var _SiteContent = require('./SiteContent');

var _PdfMedia = require('./PdfMedia');

var _SffAudioMedia = require('./SffAudioMedia');

var _RsdMedia = require('./RsdMedia');

var _WebPage = require('./WebPage');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('url'),
    URL = _require.URL;