"use strict";

var MEDIA_TYPES = {
  TOTALS_TYPE: 'TOTALS_TYPE',
  RSD_TYPE: 'RSD_TYPE',
  PDF_TYPE: 'PDF_TYPE',
  PODCAST_TYPE: 'PODCAST_TYPE',
  POST_TYPE: 'POST_TYPE'
};

if (typeof React == 'undefined') {
  // NB for NodeJs server to accept MEDIA_REFS
  var React = {
    createRef: function createRef() {}
  };
}

var MEDIA_REFS = {
  TOTALS_TYPE: React.createRef(),
  RSD_TYPE: React.createRef(),
  PDF_TYPE: React.createRef(),
  PODCAST_TYPE: React.createRef(),
  POST_TYPE: React.createRef()
};
var MEDIA_RADIOS = {
  TOTALS_RADIO: 'Media Totals',
  RSD_RADIO: 'RSDs',
  PDF_RADIO: 'PDFs',
  PODCAST_RADIO: 'SFFaudio Podcasts',
  POST_RADIO: 'Blog Posts'
};
var MEDIA_LABELS = {
  PDF_LABEL: 'Public PDF - ',
  RSD_LABEL: 'Reading Short and Deep  - ',
  PODCAST_LABEL: 'SFFaudio Podcasts  - ',
  POST_LABEL: 'Blog Posts  - '
};
var TIME_OUT_MSEC = 4000;
var NUM_FETCH_TRIES = 3;
var FILTER_TEXT_BY = 'Only show media matching ';
var PLACE_HOLDER = 'text';

function initTotalHtml() {
  var init_total_html = "\n    <div>\n        <div>\n            <label><input type=\"radio\" name=\"radio_media\" checked=\"\" >".concat(MEDIA_RADIOS.TOTALS_RADIO, "</label>\n            <label><input type=\"radio\" name=\"radio_media\">").concat(MEDIA_RADIOS.RSD_RADIO, "</label>\n            <label><input type=\"radio\" name=\"radio_media\">").concat(MEDIA_RADIOS.PDF_RADIO, "</label>\n            <label><input type=\"radio\" name=\"radio_media\">").concat(MEDIA_RADIOS.PODCAST_RADIO, "</label>\n            <label><input type=\"radio\" name=\"radio_media\">").concat(MEDIA_RADIOS.POST_RADIO, "</label>\n        <div>\n        <br>\n        <div>\n            <label>").concat(FILTER_TEXT_BY, "<input value=\"\" placeholder=\"").concat(PLACE_HOLDER, "\"></label>\n        </div>\n        <ul>\n            <li>&nbsp;</li>\n            <li>&nbsp;</li>\n            <li>&nbsp;</li>\n            <li>&nbsp;</li>\n        </ul>\n    </div> ");
  return init_total_html;
}

function MediaRadioLists(props) {
  var media_filter = '';
  var media_transform_func = '';
  var plain_text_func = '';
  var showing_totals = false;
  var showing_pdfs = false;
  var showing_posts = false;
  var rsd_regExp = RegExp('RsdMedia_');
  var pdf_regExp = RegExp('PdfMedia_');
  var podcast_regExp = RegExp('SffAudioMedia_');
  var post_regExp = RegExp('POST_');
  var totals_regExp = RegExp('_no_match_totals_show_');
  var NOT_A_Z_SPACE_DOT = RegExp('[^a-z0-9 .]/gi');

  function rsdTransformFunc(a_media) {
    var rsd_description = a_media.podcast.description;
    var rsd_episode = a_media.podcast.episode;
    var rsd_post = a_media.rsd_post;
    var post_html = React.createElement("a", {
      href: rsd_post
    }, " #", rsd_episode, " ", rsd_description, " ");
    return post_html;
  }

  function rsdPlainTextFunc(a_media) {
    var rsd_description = a_media.podcast.description;
    return rsd_description;
  }

  function pdfTransformFunc(a_media) {
    var pdf_url = a_media.url;
    var book_author = a_media.author;
    var book_title = a_media.title;
    var book_publisher = a_media.publisher;
    var book_pages = a_media.pages;

    if (book_pages > 1) {
      var pages_word = book_pages + ' pages';
    } else {
      var pages_word = book_pages + ' page';
    }

    var published_by_by = ' - ' + book_author + ', ' + pages_word + ', ' + book_publisher;
    var post_html = React.createElement("span", null, React.createElement("a", {
      href: pdf_url
    }, " ", book_title, " "), published_by_by);
    return post_html;
  }

  function pdfPlainTextFunc(a_media) {
    var book_author = a_media.author;
    var book_title = a_media.title;
    var book_publisher = a_media.publisher;
    var rsd = book_title + ' ' + book_author + ' ' + book_publisher;
    return rsd;
  }

  function podcastTransformFunc(a_media) {
    if (a_media.possiblebook.author) {
      var book_author = a_media.possiblebook.author;
      var book_title = a_media.possiblebook.title;
      var podcast_mess = book_title + ' by ' + book_author;
    } else {
      var podcast_mess = a_media.about;
    }

    var rsd_description = a_media.podcast.description;
    var rsd_episode = a_media.podcast.episode;
    var sffaudio_post = a_media.sffaudio_post;
    var post_html = React.createElement("span", null, " ", podcast_mess, " ", React.createElement("a", {
      href: sffaudio_post
    }, " #", rsd_episode, " ", rsd_description, " "), " ");
    return post_html;
  }

  function podcastPlainTextFunc(a_media) {
    return a_media.possiblebook.title;
  }

  function postTransformFunc(a_media) {
    if (a_media.article_post) {
      var page_post = a_media.article_post;
    } else {
      var page_post = a_media.mention_post;
    }

    var page_headline = a_media.headline;
    var post_html = React.createElement("a", {
      href: page_post
    }, " ", page_headline);
    return post_html;
  }

  function postPlainTextFunc(a_media) {
    if (a_media.article_post) {
      var plain_post = a_media.article_post + ' ' + a_media.headline;
    } else {
      var plain_post = a_media.mention_post + ' ' + a_media.headline;
    }

    return plain_post;
  }

  function totalsTransformFunc(a_media) {
    return a_media;
  }

  function totalsPlainTextFunc(a_media) {
    return '';
  }

  function liTransformFunc(media_string, index) {
    var rsd = React.createElement("li", {
      key: "li_index_" + index
    }, media_string.media_html, " ");
    return rsd;
  }

  function filterTransform(media_type) {
    showing_totals = false;
    showing_pdfs = false;
    showing_posts = false;

    if (media_type === SFF_AUDIO_GRAPH_QL.MEDIA_TYPES.RSD_TYPE) {
      media_filter = rsd_regExp;
      media_transform_func = rsdTransformFunc;
      plain_text_func = rsdPlainTextFunc;
    } else if (media_type === SFF_AUDIO_GRAPH_QL.MEDIA_TYPES.PDF_TYPE) {
      media_filter = pdf_regExp;
      media_transform_func = pdfTransformFunc;
      plain_text_func = pdfPlainTextFunc;
      showing_pdfs = true;
    } else if (media_type === SFF_AUDIO_GRAPH_QL.MEDIA_TYPES.PODCAST_TYPE) {
      media_filter = podcast_regExp;
      media_transform_func = podcastTransformFunc;
      plain_text_func = podcastPlainTextFunc;
    } else if (media_type === SFF_AUDIO_GRAPH_QL.MEDIA_TYPES.POST_TYPE) {
      media_filter = post_regExp;
      media_transform_func = postTransformFunc;
      plain_text_func = postPlainTextFunc;
      showing_posts = true;
    } else {
      media_filter = totals_regExp;
      media_transform_func = totalsTransformFunc;
      plain_text_func = totalsPlainTextFunc;
      showing_totals = true;
    }
  }

  function calcTotals(these_props) {
    var pdf_list = these_props.filter(function (a_media) {
      return pdf_regExp.test(a_media.ID);
    });
    var rsd_list = these_props.filter(function (a_media) {
      return rsd_regExp.test(a_media.ID);
    });
    var podcast_list = these_props.filter(function (a_media) {
      return podcast_regExp.test(a_media.ID);
    });
    var post_list = these_props.filter(function (a_media) {
      if (notRsdOrPodcast(a_media)) {
        return post_regExp.test(a_media.ID);
      } else {
        return false;
      }
    });
    var total_list = [{
      media_html: SFF_AUDIO_GRAPH_QL.MEDIA_LABELS.RSD_LABEL + rsd_list.length
    }, {
      media_html: SFF_AUDIO_GRAPH_QL.MEDIA_LABELS.PDF_LABEL + pdf_list.length
    }, {
      media_html: SFF_AUDIO_GRAPH_QL.MEDIA_LABELS.PODCAST_LABEL + podcast_list.length
    }, {
      media_html: SFF_AUDIO_GRAPH_QL.MEDIA_LABELS.POST_LABEL + post_list.length
    }];
    var total_strings = total_list.map(liTransformFunc);
    return total_strings;
  }

  function pdfIssues(one_media_list) {
    var by_issue = [];
    one_media_list.map(function (a_pdf) {
      var author = a_pdf.book.author;
      var title = a_pdf.book.title;
      a_pdf.issues.map(function (an_issue) {
        var url = an_issue.url;
        var publisher = an_issue.publisher;
        var pages = an_issue.pages;
        var new_pdf = {
          author: author,
          title: title,
          url: url,
          publisher: publisher,
          pages: pages
        };
        by_issue.push(new_pdf);
      });
    });
    return by_issue;
  }

  function sortByText(a, b) {
    if (a.plain_text < b.plain_text) {
      return -1;
    }

    if (a.plain_text > b.plain_text) {
      return 1;
    }

    return 0;
  }

  function transformList(media_obj) {
    var transform_obj = {};
    transform_obj['plain_text'] = plain_text_func(media_obj);
    transform_obj['media_html'] = media_transform_func(media_obj);
    return transform_obj;
  }

  function notRsdOrPodcast(a_media) {
    if (a_media.headline) {
      if (a_media.headline.indexOf('The SFFaudio Podcast') > -1) {
        return false;
      }

      if (a_media.headline.indexOf('Reading, Short And Deep') > -1) {
        return false;
      }
    }

    return true;
  }

  function chooseType(these_props) {
    if (showing_totals) {
      return calcTotals(these_props);
    }

    var one_media_list = these_props.filter(function (a_media) {
      return media_filter.test(a_media.ID);
    });

    if (showing_pdfs) {
      one_media_list = pdfIssues(one_media_list);
    } else if (showing_posts) {
      var one_media_list = one_media_list.filter(function (a_blog_post) {
        return notRsdOrPodcast(a_blog_post);
      });
    }

    var transformed_list = one_media_list.map(transformList);
    transformed_list.sort(sortByText);
    var safe_filter = filter_string.replace(NOT_A_Z_SPACE_DOT, '');
    var string_filter = RegExp(safe_filter, 'i');
    var filtered_list = transformed_list.filter(function (media_obj) {
      return string_filter.test(media_obj.plain_text);
    });

    if (filtered_list.length === 0) {
      var empty_list = {
        'plain_text': 'none',
        'media_html': 'none'
      };
      filtered_list.push(empty_list);
    }

    var li_strings = filtered_list.map(liTransformFunc);
    return li_strings;
  }

  function mediaRadioBtn(radio_name, radio_text) {
    var radio_ref = SFF_AUDIO_GRAPH_QL.MEDIA_REFS[radio_name];

    var button_event = function button_event(event) {
      setMediaType(event.target.id);
      setFilter('');
    };

    if (radio_name === media_type) {
      var is_checked = true;
    } else {
      var is_checked = false;
    }

    var show_totals = React.createElement("label", null, React.createElement("input", {
      type: "radio",
      ref: radio_ref,
      name: "radio_media",
      id: radio_name,
      onChange: button_event,
      value: radio_name,
      checked: is_checked
    }), radio_text);
    return show_totals;
  }

  function allRadios() {
    var show_totals = mediaRadioBtn(SFF_AUDIO_GRAPH_QL.MEDIA_TYPES.TOTALS_TYPE, SFF_AUDIO_GRAPH_QL.MEDIA_RADIOS.TOTALS_RADIO);
    var show_rsd = mediaRadioBtn(SFF_AUDIO_GRAPH_QL.MEDIA_TYPES.RSD_TYPE, SFF_AUDIO_GRAPH_QL.MEDIA_RADIOS.RSD_RADIO);
    var show_pdf = mediaRadioBtn(SFF_AUDIO_GRAPH_QL.MEDIA_TYPES.PDF_TYPE, SFF_AUDIO_GRAPH_QL.MEDIA_RADIOS.PDF_RADIO);
    var show_podcasts = mediaRadioBtn(SFF_AUDIO_GRAPH_QL.MEDIA_TYPES.PODCAST_TYPE, SFF_AUDIO_GRAPH_QL.MEDIA_RADIOS.PODCAST_RADIO);
    var show_blogs = mediaRadioBtn(SFF_AUDIO_GRAPH_QL.MEDIA_TYPES.POST_TYPE, SFF_AUDIO_GRAPH_QL.MEDIA_RADIOS.POST_RADIO);
    return React.createElement("div", null, show_totals, " ", show_rsd, " ", show_pdf, " ", show_podcasts, " ", show_blogs);
  }

  function filterText(filter_string) {
    return React.createElement("div", null, React.createElement("label", null, SFF_AUDIO_GRAPH_QL.FILTER_TEXT_BY, React.createElement("input", {
      onChange: function onChange(event) {
        return setFilter(event.target.value);
      },
      value: filter_string,
      placeholder: SFF_AUDIO_GRAPH_QL.PLACE_HOLDER
    })));
  } // START


  var checked_radio = React.useState(props.checked_radio);
  var media_type = checked_radio[0];
  var setMediaType = checked_radio[1];
  var filter_array = React.useState('');
  var filter_string = filter_array[0];
  var setFilter = filter_array[1];
  filterTransform(media_type);
  var li_strings = chooseType(props.the_json);
  var all_radios = allRadios();
  var filter_text = filterText(filter_string);
  return React.createElement("div", null, all_radios, React.createElement("br", null), filter_text, React.createElement("ul", null, li_strings));
}

function getGraphCall(machine_name, elem_name) {
  var sff_ajax_search = function sff_ajax_search(search_str) {
    var test_json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var checked_radio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    function fetchTimeout(fetch_url, time_out_msec, num_tries) {
      var has_timed_out = false;
      return new Promise(function (resolve, reject) {
        if (num_tries == 0) {
          resolve(my.crash_response);
        }

        var rejectFetchSoon = function rejectFetchSoon() {
          has_timed_out = true;
          reject(new Error('time out error 6924'));
        };

        var timeout_error = setTimeout(rejectFetchSoon, time_out_msec);
        fetch(fetch_url).then(function (good_response) {
          clearTimeout(timeout_error);

          if (!has_timed_out) {
            resolve(good_response);
          }
        }).catch(function (server_error) {
          reject(server_error);
        });
      }).catch(function (catch_timeout_error) {
        return fetchTimeout(fetch_url, time_out_msec, num_tries - 1);
      });
    }

    function graphQlUrl(machine_url, search_string) {
      var query_str = "/graphql/graphql?operationName=serch_ql&query=%0Aquery%20serch_ql(%24search_parameter%3A%20String!)%20%7B%0A%20search_site_content(search_text%3A%20%24search_parameter)%20%7B%0A%20...%20on%20ArticlePage%7B%20ID%20headline%20article_post%20%7D%2C%0A%20...%20on%20MentionPage%7B%20ID%20headline%20mention_post%20%7D%2C%0A%20...%20on%20RsdMedia%20%7B%20ID%20rsd_post%20resource%0A%20book%20%7B%20author%20title%20%7D%0A%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%7D%2C%0A%20...%20on%20SffAudioMedia%20%7B%20ID%20sffaudio_post%20narrator%20about%0A%20possiblebook%7B%20author%20title%20%7D%0A%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%7D%2C%0A%20...%20on%20PdfMedia%20%7B%20ID%0A%20book%20%7B%20author%20title%20%7D%0A%20issues%20%7B%20url%20publisher%20pages%20%7D%20%7D%0A%20%7D%0A%7D%20&variables=%7B%20%22search_parameter%22%3A%20%22".concat(search_string, "%22%7D");
      var graph_ql_url = machine_url + query_str;
      return graph_ql_url;
    }

    function buildMediaRadios(containing_elem, my_json) {
      var checked_radio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : SFF_AUDIO_GRAPH_QL.MEDIA_TYPES.TOTALS_TYPE;
      var widget_elem = document.getElementById(containing_elem);
      var MediaRadioLists = SFF_AUDIO_GRAPH_QL.MediaRadioLists;
      return ReactDOM.render(React.createElement(MediaRadioLists, {
        the_json: my_json,
        checked_radio: checked_radio
      }), widget_elem);
    }

    function clickTotals() {
      try {
        document.getElementById('TOTALS_TYPE').click();
      } catch (e) {//   console.log(e)
      }
    } // start


    if (!checked_radio) {
      checked_radio = SFF_AUDIO_GRAPH_QL.MEDIA_TYPES.TOTALS_TYPE;
    }

    if (test_json) {
      var actual_html = buildMediaRadios(elem_name, test_json, checked_radio);
      return new Promise(function (resolve, reject) {
        resolve(actual_html);
      });
    } else {
      clickTotals();
      buildMediaRadios(elem_name, [], checked_radio);
      var graph_ql_url = graphQlUrl(machine_name, search_str);
      return fetchTimeout(graph_ql_url, SFF_AUDIO_GRAPH_QL.TIME_OUT_MSEC, SFF_AUDIO_GRAPH_QL.NUM_FETCH_TRIES).then(function (response) {
        return response.json();
      }).then(function (my_json) {
        var the_data = my_json.data.search_site_content;
        buildMediaRadios(elem_name, the_data, checked_radio);
        clickTotals();
      });
    }
  };

  return sff_ajax_search;
}

function browserMediaObject() {
  var media_types = JSON.stringify(MEDIA_TYPES);
  var media_radios = JSON.stringify(MEDIA_RADIOS);
  var media_refs = JSON.stringify(MEDIA_REFS);
  var media_labels = JSON.stringify(MEDIA_LABELS);
  var time_out_msec = JSON.stringify(TIME_OUT_MSEC);
  var num_fetch_tries = JSON.stringify(NUM_FETCH_TRIES);
  var filter_text_by = JSON.stringify(FILTER_TEXT_BY);
  var place_holder = JSON.stringify(PLACE_HOLDER);
  var init_total_html_str = initTotalHtml.toString();
  var media_radio_lists = MediaRadioLists.toString();
  var get_graph_call = getGraphCall.toString();
  var react_funcs = "\n        <script>\n             var SFF_AUDIO_GRAPH_QL = {\n                 MEDIA_TYPES : ".concat(media_types, ",\n                 MEDIA_RADIOS : ").concat(media_radios, ",\n                 MEDIA_REFS : ").concat(media_refs, ",\n                 MEDIA_LABELS : ").concat(media_labels, ",\n                 \n                 TIME_OUT_MSEC :").concat(time_out_msec, ",\n                 NUM_FETCH_TRIES :").concat(num_fetch_tries, ",\n                 FILTER_TEXT_BY :").concat(filter_text_by, ",\n                 PLACE_HOLDER: ").concat(place_holder, ",\n                 \n                 initTotalHtml : ").concat(init_total_html_str, ",\n                 MediaRadioLists : ").concat(media_radio_lists, ",\n                 getGraphCall :  ").concat(get_graph_call, "\n         };\n        </script>");
  return react_funcs;
}

function reactPolyfillCdn() {
  var react_src = "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/react/16.8.4/umd/react.development.js\"></script>\n                     <script src=\"https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.4/umd/react-dom.development.js\"></script>\n                     <script  src='https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.5.2/bluebird.min.js'></script>\n                     <script  src='https://cdn.jsdelivr.net/npm/unfetch@4.0.1/polyfill/index.js'></script>";
  return react_src;
}

function widgetHtml(widget_id) {
  var init_total_html = initTotalHtml();
  var react_poly_cdn = reactPolyfillCdn();
  var browser_media_object = browserMediaObject();
  var widget_html = "\n        <div id=\"".concat(widget_id, "\">\n            ").concat(init_total_html, "\n        </div>\n        ").concat(react_poly_cdn, "\n        ").concat(browser_media_object, "   ");
  return widget_html;
}

module.exports = {
  widgetHtml: widgetHtml
};