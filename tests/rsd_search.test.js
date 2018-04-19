

import {RsdMedia, RSD_SEARCH_FIELDS, HEROKU_RSD } from '../src/RsdMedia';
import {buildTestFetch} from './testFetch';
import {SFFAUDIO_HEROKU} from '../src/constants';



const urls_to_text = {
  'https://sffaudio.herokuapp.com/rsd/table/' : "./tests/table_rsd.html"
}
const testFetch = buildTestFetch(urls_to_text)
global.fetch = testFetch



import {rsd_search_expected} from './rsd_search_expected';



it('works with promises', () => {
  expect.assertions(1);

var search_for= 'clarke'
var exact_match = false
const rsd_datasource = new URL(HEROKU_RSD, SFFAUDIO_HEROKU);
var rsd_data = RsdMedia.fetchRsd(rsd_datasource, search_for, RSD_SEARCH_FIELDS, exact_match);
return rsd_data.then(data => expect(data).toEqual(rsd_search_expected));
});



















