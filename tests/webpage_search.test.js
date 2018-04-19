

import {WebPage} from '../src/WebPage';
import {buildTestFetch} from './testFetch';
import {SFFAUDIO_COM, SFFAUDIO_ARTICLE_MENTIONS_PHP} from '../src/constants';




const urls_to_text = {
  'http://www.sffaudio.com/articles_mentions.php?search_text=Grasshopper' : "./tests/table_webpage.txt"
}
const testFetch = buildTestFetch(urls_to_text)
global.fetch = testFetch


import {webpage_search_expected} from './webpage_search_expected';

it('works with promises', () => {
  expect.assertions(1);

var search_for= 'Grasshopper'
var exact_match = false

const web_search_url = SFFAUDIO_ARTICLE_MENTIONS_PHP + '?search_text=' + search_for;
const web_datasource = new URL(web_search_url, SFFAUDIO_COM);
var webpage_data = WebPage.fetchWebPages(web_datasource, '', [], exact_match);
return webpage_data.then(data => expect(data).toEqual(webpage_search_expected));


});



















