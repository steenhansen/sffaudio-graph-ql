
import {SffAudioMedia, SFF_AUDIO_SEARCH_FIELDS, HEROKU_PODCASTS} from '../src/SffAudioMedia';
import {SFFAUDIO_HEROKU} from '../src/constants';
import {buildTestFetch} from './testFetch';

const urls_to_text = {
  'https://sffaudio.herokuapp.com/podcast/table/' : "./tests/table_podcast.html"
}
const testFetch = buildTestFetch(urls_to_text)
global.fetch = testFetch


import {sffAudio_search_expected} from './sffAudio_search_expected';

it('works with promises', () => {
  expect.assertions(1);

  var search_for= 'Hollweg'
  var exact_match = false
  const sffaudio_datasource = new URL(HEROKU_PODCASTS, SFFAUDIO_HEROKU);
  var sffaudio_data = SffAudioMedia.fetchSffAudio(sffaudio_datasource, search_for, SFF_AUDIO_SEARCH_FIELDS, exact_match);
  return sffaudio_data.then(data => expect(data).toEqual(sffAudio_search_expected));
});


















