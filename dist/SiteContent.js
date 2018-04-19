'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATA_SPLIT = /}\s*,/;
var DATA_FIX_END = '},';

var SiteContent = function () {
  function SiteContent() {
    (0, _classCallCheck3.default)(this, SiteContent);
  }

  (0, _createClass3.default)(SiteContent, [{
    key: 'uniqueId',
    value: function uniqueId(the_id) {
      var unique_id = this.constructor.name + '_' + the_id;
      return unique_id;
    }
  }, {
    key: 'propertiesToJson',
    value: function propertiesToJson() {
      var no_types = (0, _stringify2.default)(this);
      var json_obj = JSON.parse(no_types);
      return json_obj;
    }
  }], [{
    key: 'contentToJson',
    value: function contentToJson(content_objects) {
      var content_jsons = [];
      content_objects.forEach(function (content_object) {
        var content_json = content_object.propertiesToJson();
        content_jsons.push(content_json);
      });
      return content_jsons;
    }
  }, {
    key: 'splitContent',
    value: function splitContent(body, start_data, end_data) {
      var header_and_data_end = body.split(start_data);
      var data_and_end = header_and_data_end[1];
      var data_only = data_and_end.split(end_data);
      var data_list = data_only[0] + DATA_FIX_END;
      var data_arr = data_list.split(DATA_SPLIT);
      data_arr.pop();
      return data_arr;
    }
  }, {
    key: 'jsonContent',
    value: function jsonContent(an_rsd) {
      var fixed_rsd = an_rsd + '}';
      var rsd_obj = JSON.parse(fixed_rsd);
      return rsd_obj;
    }
  }, {
    key: 'filterContent',
    value: function filterContent(media_obj, search_in, search_for, jsonFactory, exact_match) {
      var content_object = void 0;
      search_for = search_for.toLowerCase();
      if (search_for === '') {
        content_object = jsonFactory(media_obj);
      } else if (exact_match && search_for == search_in) {
        content_object = jsonFactory(media_obj);
      } else if (!exact_match && search_in.includes(search_for)) {
        content_object = jsonFactory(media_obj);
      } else {
        content_object = false;
      }
      return content_object;
    }
  }, {
    key: 'parseContent',
    value: function parseContent(body, options) {
      var search_for = options.search_for,
          jsonFactory = options.jsonFactory,
          search_fields = options.search_fields,
          start_data = options.start_data,
          end_data = options.end_data,
          empty_data = options.empty_data,
          exact_match = options.exact_match;

      if (body.match(empty_data)) {
        return [];
      }
      var data_arr = SiteContent.splitContent(body, start_data, end_data);
      var rsd_list = [];
      data_arr.forEach(function (an_rsd) {
        var rsd_obj = SiteContent.jsonContent(an_rsd);
        var search_in = '';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(search_fields), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            search_in += rsd_obj[value];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        search_in = search_in.toLowerCase();
        var content_object = SiteContent.filterContent(rsd_obj, search_in, search_for, jsonFactory, exact_match);
        if (content_object) {
          rsd_list.push(content_object);
        }
      });
      return rsd_list;
    }
  }, {
    key: 'fetchContent',
    value: function fetchContent(options) {
      var media_datasource = options.the_datasource;

      var the_url = media_datasource.href;
      var data_from_url = fetch(the_url) // N.B. under test this call goes to testFetch() instead
      .then(function (res) {
        return res.text();
      }).then(function (res_text) {
        return SiteContent.parseContent(res_text, options);
      });
      return data_from_url;
    }
  }]);
  return SiteContent;
}();

module.exports.SiteContent = SiteContent;