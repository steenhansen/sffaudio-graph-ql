"use strict";

var _buildSingleFetch = require("./tests/buildSingleFetch");

/*


http://localhost:3000/graphiql?operationName=serch_ql&query=query%20serch_ql(%24search_parameter%3A%20String!)%20%7B%0A%20%20search_site_content(search_text%3A%20%24search_parameter)%20%7B%0A%0A%0A%20%20%20%20...%20on%20ArticlePage%7B%0A%20%20%20%20%20%20%20ID%0A%20%20%20%20%20%20%20%20headline%0A%20%20%20%20%20%20%20%20article_post%0A%20%20%20%20%7D%2C%0A%0A%20%20...%20on%20MentionPage%7B%0A%20%20%20%20%20%20%20ID%0A%20%20%20%20%20%20%20%20headline%0A%20%20%20%20%20%20%20%20mention_post%0A%20%20%20%20%7D%2C%0A%0A%20%20...%20on%20RsdMedia%20%7B%0A%20%20%20%20%20%20%20ID%0A%20%20%20%20%20%20book%7B%0A%20%20%20%20%20%20%20%20author%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20podcast%20%7B%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20mp3%0A%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20episode%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20rsd_post%0A%20%20%20%20%20%20resource%0A%20%20%20%20%7D%2C%0A%0A%0A%20%20...%20on%20SffAudioMedia%20%7B%0A%20%20%20%20%20%20%20ID%0A%20%20%20%20%20%20possiblebook%7B%0A%20%20%20%20%20%20%20%20author%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20podcast%20%7B%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20mp3%0A%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20episode%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20sffaudio_post%0A%20%20%20%20%20%20narrator%0A%20%20%20%20%7D%2C%0A%0A%0A%0A%20%20...%20on%20PdfMedia%20%7B%0A%20%20%20%20%20%20%20ID%0A%20%20%20%20%20%20book%7B%0A%20%20%20%20%20%20%20%20author%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20issues%20%7B%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20publisher%0A%20%20%20%20%20%20%20%20pages%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%0A%0A%0A%0A%20%20%7D%0A%7D%0A&variables=%7B%20%22search_parameter%22%3A%20%22Clarke%22%7D


 http://localhost:3000/graphql?operationName=serch_ql&query=query%20serch_ql(%24search_parameter%3A%20String!)%20%7B%0A%20%20search_site_content(search_text%3A%20%24search_parameter)%20%7B%0A%0A%0A%20%20%20%20...%20on%20ArticlePage%7B%0A%20%20%20%20%20%20%20ID%0A%20%20%20%20%20%20%20%20headline%0A%20%20%20%20%20%20%20%20article_post%0A%20%20%20%20%7D%2C%0A%0A%20%20...%20on%20MentionPage%7B%0A%20%20%20%20%20%20%20ID%0A%20%20%20%20%20%20%20%20headline%0A%20%20%20%20%20%20%20%20mention_post%0A%20%20%20%20%7D%2C%0A%0A%20%20...%20on%20RsdMedia%20%7B%0A%20%20%20%20%20%20%20ID%0A%20%20%20%20%20%20book%7B%0A%20%20%20%20%20%20%20%20author%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20podcast%20%7B%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20mp3%0A%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20episode%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20rsd_post%0A%20%20%20%20%20%20resource%0A%20%20%20%20%7D%2C%0A%0A%0A%20%20...%20on%20SffAudioMedia%20%7B%0A%20%20%20%20%20%20%20ID%0A%20%20%20%20%20%20possiblebook%7B%0A%20%20%20%20%20%20%20%20author%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20podcast%20%7B%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20mp3%0A%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20episode%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20sffaudio_post%0A%20%20%20%20%20%20narrator%0A%20%20%20%20%7D%2C%0A%0A%0A%0A%20%20...%20on%20PdfMedia%20%7B%0A%20%20%20%20%20%20%20ID%0A%20%20%20%20%20%20book%7B%0A%20%20%20%20%20%20%20%20author%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20issues%20%7B%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20publisher%0A%20%20%20%20%20%20%20%20pages%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%0A%0A%0A%0A%20%20%7D%0A%7D%0A&variables=%7B%20%22search_parameter%22%3A%20%22Clarke%22%7D

 */

var search_results = [{
  "ID": "RsdMedia_097",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Stroke Of The Sun"
  },
  "podcast": {
    "description": "The Stroke Of The Sun by Arthur C. Clarke",
    "mp3": "http://www.sffaudio.com/podcasts/rsd097StrokeOfTheSun.mp3",
    "length": "0:32",
    "episode": "097"
  },
  "rsd_post": "http://www.sffaudio.com/reading-short-and-deep-097-the-stroke-of-the-sun-by-arthur-c-clarke/",
  "resource": "http://www.sffaudio.com/podcasts/TheStrokeOfTheSunByArthurC.Clarke.pdf"
}, {
  "ID": "RsdMedia_009",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Nine Billion Names Of God"
  },
  "podcast": {
    "description": "Nine Billion by Arthur C. Clarke",
    "mp3": "http://www.sffaudio.com/podcasts/rsd009NineBillion.mp3",
    "length": "0:36",
    "episode": "009"
  },
  "rsd_post": "http://www.sffaudio.com/reading-short-and-deep-009-the-nine-billion-names-of-god-by-sir-arthur-c-clarke",
  "resource": "http://www.sffaudio.com/podcasts/TheNineBillionNamesOfGodByArthurC.Clarke.pdf"
}, {
  "ID": "PdfMedia_4533",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "Against The Fall Of Night"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/AgainstTheFallOfNightByArthurC.Clarke.pdf",
    "publisher": "Startling Stories, November 1948 ",
    "pages": 62
  }]
}, {
  "ID": "PdfMedia_4451",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "Prelude To Space"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/PreludeToSpaceByArthurC.Clarke.pdf",
    "publisher": "Galaxy Science Fiction, Novel No. 3, 1951 ",
    "pages": 161
  }]
}, {
  "ID": "PdfMedia_3311",
  "book": {
    "author": "Jay Clarke",
    "title": "High Man"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/HighManByJayClarke.pdf",
    "publisher": "Galaxy Science Fiction, June 1954 ",
    "pages": 10
  }]
}, {
  "ID": "PdfMedia_2701",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "Armaments Race [a Tales From The White Hart story]"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/ArmamentsRaceByArthurC.Clarke.pdf",
    "publisher": "Adventure, April 1954 ",
    "pages": 6
  }]
}, {
  "ID": "PdfMedia_2577",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "Castaway"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/CastawayByArthurC.ClarkeSTRANGESIGNPOSTS.pdf",
    "publisher": "Strange Signposts, 1966 ",
    "pages": 7
  }]
}, {
  "ID": "PdfMedia_1817",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Wall Of Darkness"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheWallOfDarknessByArthurC.Clarke.pdf",
    "publisher": "Super-Science Stories, July 1949 ",
    "pages": 14
  }]
}, {
  "ID": "PdfMedia_1269",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Other Side Of The Sky PART 1 – 'Special Delivery'"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheOtherSideOfTheSkyNo1SpecialDeliveryByArthurC.Clarke.pdf",
    "publisher": "Infinity, September 1957 ",
    "pages": 7
  }]
}, {
  "ID": "PdfMedia_1268",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Other Side Of The Sky PART 2 – 'Feathered Friend'"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheOtherSideOfTheSkyNo2FeatheredFriendByArthurC.Clarke.pdf",
    "publisher": "Infinity, September 1957 ",
    "pages": 7
  }]
}, {
  "ID": "PdfMedia_1267",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Other Side Of The Sky PART 3 – 'Take A Deep Breath'"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheOtherSideOfTheSkyNo3TakeADeepBreathByArthurC.Clarke.pdf",
    "publisher": "Infinity, September 1957 ",
    "pages": 7
  }]
}, {
  "ID": "PdfMedia_1266",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Other Side Of The Sky PART 4 – 'Freedom Of Space'"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/FreedomOfSpaceByArthurC.Clarke.pdf",
    "publisher": "Infinity, October 1957 ",
    "pages": 7
  }]
}, {
  "ID": "PdfMedia_1265",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Other Side Of The Sky PART 5 – 'Passer By'"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/PasserByByArthurC.Clarke.pdf",
    "publisher": "Infinity, October 1957 ",
    "pages": 7
  }]
}, {
  "ID": "PdfMedia_1264",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Other Side Of The Sky PART 6 – 'The Call Of The Stars'"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheCallOfTheStarsByArthurC.Clarke.pdf",
    "publisher": "Infinity, October 1957 ",
    "pages": 7
  }]
}, {
  "ID": "PdfMedia_767",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "At The End Of The Orbit (aka 'Hate')"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/AtTheEndOfTheOrbitByArthurC.Clarke.pdf",
    "publisher": "IF: Worlds Of Science Fiction, November 1961 ",
    "pages": 18
  }]
}, {
  "ID": "PdfMedia_766",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "Before Eden"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/BeforeEdenByArthurC.Clarke.pdf",
    "publisher": "Amazing, June 1951 ",
    "pages": 13
  }]
}, {
  "ID": "PdfMedia_765",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Deep Range"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheDeepRangeByArthurC.Clarke.pdf",
    "publisher": "Star Science Fiction Stories No. 3 (1955) ",
    "pages": 10
  }]
}, {
  "ID": "PdfMedia_764",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "Encounter In The Dawn"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/EncounterInTheDawnByArthurC.Clarke.pdf",
    "publisher": "Amazing Stories, June-July 1953 ",
    "pages": 15
  }]
}, {
  "ID": "PdfMedia_763",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "Exile Of The Eons aka Nemesis"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/ExileOfTheEonsByArthurC.Clarke.pdf",
    "publisher": "Super Science Stories, March 1950 ",
    "pages": 12
  }]
}, {
  "ID": "PdfMedia_762",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Nine Billion Names Of God"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheNineBillionNamesOfGodByArthurC.Clarke.pdf",
    "publisher": "Star Science Fiction Stories (1953) ",
    "pages": 8
  }]
}, {
  "ID": "PdfMedia_761",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "Guardian Angel"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/GuardianAngelByArthurC.ClarkeNW.pdf",
    "publisher": "New Worlds, Winter 1950 ",
    "pages": 29
  }, {
    "url": "http://www.sffaudio.com/podcasts/GuardianAngelByArthurC.ClarkeFFM.pdf",
    "publisher": "Famous Fantastic Mysteries, April 1950 ",
    "pages": 19
  }]
}, {
  "ID": "PdfMedia_760",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "If I Forget Thee, Oh Earth…"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/IfIForgetTheeOhEarthByArthurC.Clarke.pdf",
    "publisher": "Future, September 1951 ",
    "pages": 5
  }]
}, {
  "ID": "PdfMedia_759",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "Moon Dog aka 'Dog Star'"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/MoonDogByArthurC.Clarke.pdf",
    "publisher": "Galaxy, April 1962 ",
    "pages": 8
  }]
}, {
  "ID": "PdfMedia_758",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Next Tenants [a Tales From The White Hart story]"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheNextTenantsByArthurC.Clarke.pdf",
    "publisher": "Satellite, February 1957 ",
    "pages": 10
  }]
}, {
  "ID": "PdfMedia_757",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "Out From The Sun"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/OutFromTheSunByArthurC.Clarke.pdf",
    "publisher": "IF: Worlds Of Science Fiction, February 1958 ",
    "pages": 9
  }]
}, {
  "ID": "PdfMedia_756",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Pacifist [a Tales From The White Hart story]"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/ThePacifistByArthurC.Clarke.pdf",
    "publisher": "Fantastic Universe, October 1956 ",
    "pages": 11
  }]
}, {
  "ID": "PdfMedia_755",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Parasite"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheParasiteByArthurC.Clarke.pdf",
    "publisher": "Avon Science Fiction And Fantasy Reader, No. 2 (April 1953) ",
    "pages": 12
  }]
}, {
  "ID": "PdfMedia_754",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Possessed"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/ThePossessedByArthurC.Clarke.pdf",
    "publisher": "Dynamic Science Fiction, March 1953 ",
    "pages": 5
  }]
}, {
  "ID": "PdfMedia_753",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Reluctant Orchid [a Tales From The White Hart story]"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheReluctantOrchidByArthurC.Clarke.pdf",
    "publisher": "Satellite Science Fiction, December 1956 ",
    "pages": 10
  }]
}, {
  "ID": "PdfMedia_752",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "Second Dawn"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/SecondDawnByArthurC.Clarke.pdf",
    "publisher": "Science Fiction Quarterly, August 1951 ",
    "pages": 24
  }]
}, {
  "ID": "PdfMedia_751",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Star"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheStarByArthurC.Clarke.pdf",
    "publisher": "Infinity Science Fiction, November 1955 ",
    "pages": 9
  }]
}, {
  "ID": "PdfMedia_750",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "The Stroke Of The Sun"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/TheStrokeOfTheSunByArthurC.Clarke.pdf",
    "publisher": "Galaxy, September 1958 ",
    "pages": 8
  }]
}, {
  "ID": "PdfMedia_749",
  "book": {
    "author": "Arthur C. Clarke",
    "title": "A Walk In The Dark"
  },
  "issues": [{
    "url": "http://www.sffaudio.com/podcasts/AWalkInTheDarkByArthurC.Clarke.pdf",
    "publisher": "Thrilling Wonder Stories, August 1950 ",
    "pages": 8
  }]
}, {
  "ID": "SffAudioMedia_452",
  "possiblebook": {
    "author": "Arthur C. Clarke",
    "title": "The City And The Stars"
  },
  "podcast": {
    "description": "READALONG",
    "mp3": "http://www.sffaudio.com/podcasts/SFFaudioPodcast452.mp3",
    "length": "1:26",
    "episode": "452"
  },
  "sffaudio_post": "http://www.sffaudio.com/?p=58287"
}, {
  "ID": "SffAudioMedia_359",
  "possiblebook": {
    "author": "Sir Arthur Conan Doyle",
    "title": "The Sign Of The Four"
  },
  "podcast": {
    "description": "AUDIOBOOK",
    "mp3": "http://www.sffaudio.com/podcasts/SFFaudioPodcast359.mp3",
    "length": "4:25",
    "episode": "359"
  },
  "sffaudio_post": "http://www.sffaudio.com/?p=55907",
  "narrator": "David Clarke"
}, {
  "ID": "SffAudioMedia_170",
  "possiblebook": {
    "author": "Arthur C. Clarke",
    "title": "The Fountains Of Paradise"
  },
  "podcast": {
    "description": "READALONG",
    "mp3": "http://www.sffaudio.com/podcasts/SFFaudioPodcast170.mp3",
    "length": "1:11",
    "episode": "170"
  },
  "sffaudio_post": "http://www.sffaudio.com/?p=41081"
}, {
  "ID": "POST_58279",
  "headline": "The SFFaudio Podcast #452 - READALONG: The City And The Stars by Arthur C. Clarke",
  "article_post": "http://www.sffaudio.com/the-sffaudio-podcast-452-readalong-the-city-and-the-stars-by-arthur-c-clarke"
}, {
  "ID": "POST_58268",
  "headline": "Reading, Short And Deep #097 – The Stroke Of The Sun by Arthur C. Clarke",
  "article_post": "http://www.sffaudio.com/reading-short-and-deep-097-the-stroke-of-the-sun-by-arthur-c-clarke"
}, {
  "ID": "POST_55995",
  "headline": "Reading, Short and Deep #009 - The Nine Billion Names Of God by Sir Arthur C. Clarke",
  "article_post": "http://www.sffaudio.com/reading-short-and-deep-009-the-nine-billion-names-of-god-by-sir-arthur-c-clarke"
}, {
  "ID": "POST_58329",
  "headline": "The SFFaudio Podcast #454 - READALONG: The Forge Of God by Greg Bear",
  "mention_post": "http://www.sffaudio.com/the-sffaudio-podcast-454-readalong-the-forge-of-god-by-greg-bear"
}, {
  "ID": "POST_57176",
  "headline": "The SFFaudio Podcast #410 - READALONG: Protector by Larry Niven",
  "mention_post": "http://www.sffaudio.com/the-sffaudio-podcast-410-readalong-protector-by-larry-niven"
}];

var testFetch = (0, _buildSingleFetch.buildSingleFetch)("./tests/all_search_webpage_clarke.txt");

testFetch.then(function (data) {
  return console.log(data);
});