'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _SiteContent2 = require('./SiteContent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var POST_EMPTY = /\s*{\s*"posts"\s*:\s*\[\s*\]\s*}\s*/;

var POST_START_DATA = /{\s*"posts"\s*:\s*\[/;
var POST_END_DATA = /}\s*\]/;

var WebPage = function (_SiteContent) {
  (0, _inherits3.default)(WebPage, _SiteContent);

  function WebPage(options) {
    (0, _classCallCheck3.default)(this, WebPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WebPage.__proto__ || (0, _getPrototypeOf2.default)(WebPage)).call(this, options));

    _this.headline = options.headline;
    _this.ID = 'POST_' + options.ID;
    return _this;
  }

  (0, _createClass3.default)(WebPage, null, [{
    key: 'jsonFactory',
    value: function jsonFactory(rsd_obj) {
      var ID = void 0,
          headline = void 0,
          options = void 0,
          article_post = void 0,
          mention_post = void 0;
      ID = rsd_obj['ID'];
      headline = rsd_obj['headline'];
      if (rsd_obj['postUrl']) {
        article_post = rsd_obj['postUrl'];
        options = { ID: ID, headline: headline, article_post: article_post };
        var article_page = new ArticlePage(options);
        return article_page;
      } else {
        mention_post = rsd_obj['tagUrl'];
        options = { ID: ID, headline: headline, mention_post: mention_post };
        var mention_page = new MentionPage(options);
        return mention_page;
      }
    }
  }, {
    key: 'fetchWebPages',
    value: function fetchWebPages(page_datasource, search_for, search_fields, exact_match) {
      var the_datasource = page_datasource;
      var jsonFactory = WebPage.jsonFactory;
      var start_data = POST_START_DATA;
      var end_data = POST_END_DATA;
      var empty_data = POST_EMPTY;
      var podcast_options = { the_datasource: the_datasource, search_for: search_for, jsonFactory: jsonFactory, search_fields: search_fields, start_data: start_data, end_data: end_data, empty_data: empty_data, exact_match: exact_match };
      return _SiteContent2.SiteContent.fetchContent(podcast_options);
    }
  }]);
  return WebPage;
}(_SiteContent2.SiteContent);

var MentionPage = function (_WebPage) {
  (0, _inherits3.default)(MentionPage, _WebPage);

  function MentionPage(options) {
    (0, _classCallCheck3.default)(this, MentionPage);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (MentionPage.__proto__ || (0, _getPrototypeOf2.default)(MentionPage)).call(this, options));

    _this2.mention_post = options.mention_post;
    return _this2;
  }

  return MentionPage;
}(WebPage);

var ArticlePage = function (_WebPage2) {
  (0, _inherits3.default)(ArticlePage, _WebPage2);

  function ArticlePage(options) {
    (0, _classCallCheck3.default)(this, ArticlePage);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (ArticlePage.__proto__ || (0, _getPrototypeOf2.default)(ArticlePage)).call(this, options));

    _this3.article_post = options.article_post;
    return _this3;
  }

  return ArticlePage;
}(WebPage);

module.exports.WebPage = WebPage;