
const { URL } = require('url');

var { SiteContent } = require('./SiteContent');


var { PdfMedia, PDF_SEARCH_FIELDS, HEROKU_PDF } = require('./media/PdfMedia');


var { SffAudioMedia, SFF_AUDIO_SEARCH_FIELDS, HEROKU_PODCASTS } = require('./media/SffAudioMedia');

var { RsdMedia, RSD_SEARCH_FIELDS, HEROKU_RSD } = require('./media/RsdMedia');

var { WebPage } = require('./WebPage');

var { SFFAUDIO_HEROKU, SFFAUDIO_COM, SFFAUDIO_ARTICLE_MENTIONS_PHP } = require('./constants');


module.exports = function (fetch) {
  global.fetch = fetch;

  return {
    searchResolve: function (root, args, context) {
      var search_for = args.search_text;

      const exact_match = false;

      const rsd_datasource = new URL(HEROKU_RSD, SFFAUDIO_HEROKU);
      var rsd_data = RsdMedia.fetchRsd(rsd_datasource, search_for, RSD_SEARCH_FIELDS, exact_match);

      //const pdf_datasource = new URL(HEROKU_PDF, SFFAUDIO_HEROKU);
      //      var pdf_data = PdfMedia.fetchPdf(pdf_datasource, search_for, PDF_SEARCH_FIELDS, exact_match);

      const sffaudio_datasource = new URL(HEROKU_PODCASTS, SFFAUDIO_HEROKU);
      var sffaudio_data = SffAudioMedia.fetchSffAudio(sffaudio_datasource, search_for,
        SFF_AUDIO_SEARCH_FIELDS,
        exact_match);

      const web_datasource = new URL(SFFAUDIO_ARTICLE_MENTIONS_PHP + '?search_text=' + search_for, SFFAUDIO_COM);
      var webpage_data = WebPage.fetchWebPages(web_datasource, '', [], exact_match);

      //      return Promise.all([rsd_data, pdf_data, sffaudio_data, webpage_data])
      return Promise.all([rsd_data, sffaudio_data, webpage_data])
        .then(function (values) {
          let non_empty = values.filter(match_array => match_array.length > 0 ? true : false);
          let object_list = non_empty.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
          let json_list = object_list.map(obj => obj.propertiesToJson());
          return json_list;
        });
    },

    pageResolve: function (root, args, context) {
      let search_for, search_fields, exact_match;

      if (typeof args.get_page === 'undefined') {
        search_fields = [];
        search_for = '';
        exact_match = false;
      } else {
        search_fields = ['ID'];
        search_for = args.get_page;
        exact_match = true;
      }
      const page_datasource = new URL(SFFAUDIO_ARTICLE_MENTIONS_PHP, SFFAUDIO_COM);

      console.log('page_datasource', page_datasource);
      const page_records = WebPage.fetchWebPages(page_datasource, search_for, search_fields, exact_match)
        .then(content_objects => SiteContent.contentToJson(content_objects)
        );
      return page_records;

    },

    rsdResolve: function (root, args, context) {
      let search_for, search_fields, exact_match;

      if (typeof args.get_rsd === 'undefined') {
        search_fields = [];
        search_for = '';
        exact_match = false;
      } else {
        search_fields = ['episode number'];
        search_for = args.get_rsd;
        exact_match = true;
      }
      const rsd_datasource = new URL(HEROKU_RSD, SFFAUDIO_HEROKU);
      const rsd_records = RsdMedia.fetchRsd(rsd_datasource, search_for, search_fields, exact_match)
        .then(content_objects => SiteContent.contentToJson(content_objects)
        );
      return rsd_records;
    },

    // pdfResolve: function (root, args, context) {
    //   let search_for, search_fields, exact_match;

    //   if (typeof args.get_pdf === 'undefined') {
    //     search_fields = [];
    //     search_for = '';
    //     exact_match = false;
    //   } else {
    //     search_fields = ['episode number'];
    //     search_for = args.get_pdf;
    //     exact_match = true;
    //   }
    //   const pdf_datasource = new URL(HEROKU_PDF, SFFAUDIO_HEROKU);
    //   const pdf_records = PdfMedia.fetchPdf(pdf_datasource, search_for, search_fields, exact_match)
    //     .then(content_objects => SiteContent.contentToJson(content_objects)
    //     );
    //   return pdf_records;
    // },

    sffAudioResolve: function (root, args, context) {
      let search_for, search_fields, exact_match;

      if (typeof args.get_sffaudio === 'undefined') {
        search_fields = [];
        search_for = '';
        exact_match = false;
      } else {
        search_fields = ['episode number'];
        search_for = args.get_sffaudio;
        exact_match = true;
      }
      const sffaudio_datasource = new URL(HEROKU_PODCASTS, SFFAUDIO_HEROKU);
      const sffaudio_records = SffAudioMedia.fetchSffAudio(sffaudio_datasource, search_for, search_fields, exact_match)
        .then(content_objects => SiteContent.contentToJson(content_objects)
        );
      return sffaudio_records;
    },

    resolveContent: function (content_object) {
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
