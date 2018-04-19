
import {buildTestFetch} from './testFetch';

const urls_to_text = {
  'https://sffaudio.herokuapp.com/pdf/table/' : "./tests/table_pdf.html",
  'https://sffaudio.herokuapp.com/rsd/table/' : "./tests/table_rsd.html",
  'https://sffaudio.herokuapp.com/podcast/table/' : "./tests/table_podcast.html",
  'http://www.sffaudio.com/articles_mentions.php?search_text=clarke' : "./tests/all_search_webpage_clarke.txt",
  'http://www.sffaudio.com/articles_mentions.php?search_text=7_not_matches_19' : "./tests/all_search_webpage_7_not_matches_19.txt"
}
const testFetch = buildTestFetch(urls_to_text)

import the_resolvers from '../src/resolvers';
var {resolveContent, searchResolve, rsdResolve, pdfResolve, sffAudioResolve, pageResolve}  = the_resolvers(testFetch);


import {all_search_expected_clarke} from './all_search_expected_clarke';

it("search all with 'clarke' ", () => {
  expect.assertions(1);
  var search_all_data = searchResolve('_root_parameter', {search_text:'clarke'}, '_context_parameter')
  return search_all_data.then(data => expect(data).toEqual(all_search_expected_clarke));
});


import {all_search_expected_7_not_matches_19} from './all_search_expected_7_not_matches_19';
it("search all with '7_not_matches_19' ", () => {
  expect.assertions(1);
  var search_all_data = searchResolve('_root_parameter', {search_text:'7_not_matches_19'}, '_context_parameter')
  return search_all_data.then(data => expect(data).toEqual(all_search_expected_7_not_matches_19));
});

















