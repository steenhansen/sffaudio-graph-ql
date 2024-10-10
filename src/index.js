// For vercel

var express = require('express');
var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var bodyParser = require('body-parser');
var Schema = require('./schema');
var { widgetHtml } = require('../dist/MediaRadioLists');
const widget_id = 'media__radio__widget';




const LOCAL_PORT = 3000;
if (process.env.PORT) {
  var listen_port = process.env.PORT;
  var http_host = 'https://sffaudio-graph-ql.herokuapp.com';
} else {
  var listen_port = LOCAL_PORT;
  var http_host = 'http://localhost:' + LOCAL_PORT;
}

const server = express();

const schemaFunction =
  Schema.schemaFunction ||
  function () {
    return Schema.schema;
  };

let schema;


/*
with pdfs:
https://sffaudio-graph-ql.onrender.com/graphiql?operationName=serch_ql&query=query%20serch_ql(%24search_parameter%3A%20String!)%20%7B%0A%20%20search_site_content(search_text%3A%20%24search_parameter)%20%7B%0A%20%20%20%20%20%20...%20on%20ArticlePage%7B%20ID%20headline%20article_post%20%20%20%7D%2C%0A%20%20%20%20...%20on%20MentionPage%7B%20ID%20headline%20mention_post%20%20%20%7D%2C%0A%20%20%20%20...%20on%20RsdMedia%20%7B%20ID%20rsd_post%20resource%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20book%7B%20author%20title%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%20%20%7D%2C%0A%20%20%20%20...%20on%20SffAudioMedia%20%7B%20ID%20sffaudio_post%20narrator%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20possiblebook%7B%20author%20title%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%20%20%7D  %2C%0A%20%20%20%20...%20on%20PdfMedia%20%7B%20ID%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20book%7B%20author%20title%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20issues%20%7B%20url%20publisher%20pages%20%7D%20%20%20%7D  %0A%20%20%7D%0A%7D%0A&variables=%7B%0A%20%20%22search_parameter%22%3A%20%22Clarke%22%0A%7D

without pdfs
https://sffaudio-graph-ql.onrender.com/graphiql?operationName=serch_ql&query=query%20serch_ql(%24search_parameter%3A%20String!)%20%7B%0A%20%20search_site_content(search_text%3A%20%24search_parameter)%20%7B%0A%20%20%20%20%20%20...%20on%20ArticlePage%7B%20ID%20headline%20article_post%20%20%20%7D%2C%0A%20%20%20%20...%20on%20MentionPage%7B%20ID%20headline%20mention_post%20%20%20%7D%2C%0A%20%20%20%20...%20on%20RsdMedia%20%7B%20ID%20rsd_post%20resource%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20book%7B%20author%20title%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%20%20%7D%2C%0A%20%20%20%20...%20on%20SffAudioMedia%20%7B%20ID%20sffaudio_post%20narrator%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20possiblebook%7B%20author%20title%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%20%20%7D%0A%20%20%7D%0A%7D%0A&variables=%7B%0A%20%20%22search_parameter%22%3A%20%22Clarke%22%0A%7D
*/


/*
  in .htaccess
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET,PUT,POST,DELETE"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
 */
function corsAll(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

}

server.use(corsAll);

function parseGraphQl() {
  var graph_ql_express = graphqlExpress(async (request) => {
    if (!schema) {
      schema = schemaFunction(process.env);
    }
    var my_ret_data = {
      schema: await schema,
    };
    return my_ret_data;
  });
  return graph_ql_express;
}


server.use('/graphql', bodyParser.json(), parseGraphQl());


server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: ``,
}));


server.get('/test', function (req, res, next) {
  var { search_term, radio_type, my_test_json, expected_html } = require('./tests/piracy');
  var piracy_test = mediaRadioWidget_Test(http_host, search_term, my_test_json, radio_type, expected_html);
  res.send(piracy_test);
});

function mediaRadioWidget_Test(http_host, search_str, test_json = false, test_radio = false, test_html_expected = '') {
  var widget_html = widgetHtml(widget_id);
  var widget_html_js = `
        ${widget_html}
        <script>
            var sff_ajax_search = SFF_AUDIO_GRAPH_QL.getGraphCall('${http_host}', '${widget_id}');

             sff_ajax_search('${search_str}', ${test_json}, '${test_radio}')
            .then( function theResult(actual_html_spaces){
                if (${test_json}){
                    var actual_html = actual_html_spaces.replace(/ /g, '');
                    console.log('------------------------------------------');
                    console.log('TEST ${search_str} - ${test_radio}');
                    if (actual_html!=='${test_html_expected}'){
                         console.log(actual_html);
                         console.log('${test_html_expected}');
                    }
                }
            })
        </script> `;
  return widget_html_js;
}

function mediaRadioWidget(http_host) {
  var widget_html = widgetHtml(widget_id);
  var widget_html_js = `
<!-- start mediaRadioWidget -->
<div id="mrw_cont">
        ${widget_html}
        <script>
            var sff_ajax_search = SFF_AUDIO_GRAPH_QL.getGraphCall('${http_host}', '${widget_id}');
           //  sff_ajax_search('dick');
        </script>
  </div>
<!-- end mediaRadioWidget -->         `;
  return widget_html_js;
}

//  https://sffaudio-graph-ql.herokuapp.com/media-radio-lists
server.get('/media-radio-lists', function (req, res, next) {
  var my_stuff = mediaRadioWidget(http_host);
  res.send(my_stuff);
});

server.get('*', function (req, res) {
  res.redirect('/media-radio-lists');
});

//////////////////////////////////////////////////////////////
// for Render.com
//////////////////////////////////////////////////////////////
/*  
https://sffaudio-graph-ql.onrender.com/graphiql

https://sffaudio-graph-ql.onrender.com/graphiql?operationName=serch_ql&query=query%20serch_ql(%24search_parameter%3A%20String!)%20%7B%0A%20%20search_site_content(search_text%3A%20%24search_parameter)%20%7B%0A%20%20%20%20%20%20...%20on%20ArticlePage%7B%20ID%20headline%20article_post%20%20%20%7D%2C%0A%20%20%20%20...%20on%20MentionPage%7B%20ID%20headline%20mention_post%20%20%20%7D%2C%0A%20%20%20%20...%20on%20RsdMedia%20%7B%20ID%20rsd_post%20resource%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20book%7B%20author%20title%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%20%20%7D%2C%0A%20%20%20%20...%20on%20SffAudioMedia%20%7B%20ID%20sffaudio_post%20narrator%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20possiblebook%7B%20author%20title%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%20%20%7D%0A%20%20%7D%0A%7D%0A&variables=%7B%0A%20%20%22search_parameter%22%3A%20%22Clarke%22%0A%7D
*/

server.listen(listen_port, () => {
  console.log(`GraphQL Server is now running on ${http_host}/graphql`);
  console.log(`View GraphiQL at ${http_host}/graphiql`);
});


module.exports = server;