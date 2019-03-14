
var {MEDIA_TYPES} = require('../../dist/MediaRadioLists');

var my_test_json = [{ID: "SffAudioMedia_508",about: "PIRACY",narrator: null,podcast: {description: "TOPIC", mp3: "http://www.sffaudio.com/podcasts/SFFaudioPodcast508.mp3", length: "2:23", episode: 508},possiblebook: {author: null, title: null},sffaudio_post: "http://www.sffaudio.com/?p=59406"},
{ID: "POST_59406", headline: "The SFFaudio Podcast #508 - TOPIC: Piracy", article_post: "https://www.sffaudio.com/the-sffaudio-podcast-508-topic-piracy"},
{ID: "POST_37207", headline: "Commentary: The Sci Phi Show and Christian Meets W…r are apparently in a conspiracy to waste my time", article_post: "https://www.sffaudio.com/commentary-the-sci-phi-sh…r-are-apparently-in-a-conspiracy-to-waste-my-time"},
{ID: "POST_26982", headline: "Neil Gaiman on piracy (it's free advertising)", article_post: "https://www.sffaudio.com/neil-gaiman-on-piracy-its-free-advertising"},
 {ID: "POST_3218", headline: "BBC7: The Scarifyers - The Nazad Conspiracy", article_post: "https://www.sffaudio.com/nazad-conspiracy"},
 {ID: "POST_59162", headline: "The SFFaudio Podcast #497 – READALONG: Dune (Appendices) by Frank Herbert", mention_post: "https://www.sffaudio.com/the-sffaudio-podcast-497-readalong-dune-appendices-by-frank-herbert"},
 {ID: "POST_58656", headline: "The SFFaudio Podcast #471 - AUDIOBOOK/READALONG: Out Of The Earth by Arthur Machen", mention_post: "https://www.sffaudio.com/the-sffaudio-podcast-471-…iobookreadalong-out-of-the-earth-by-arthur-machen"},
 {ID: "POST_55685", headline: "The SFFaudio Podcast #349 - READALONG: The Ghost Pirates by William Hope Hodgson", mention_post: "https://www.sffaudio.com/the-sffaudio-podcast-349-…adalong-the-ghost-pirates-by-william-hope-hodgson"},
 {ID: "POST_53681", headline: "Review of Consumed by David Cronenberg", mention_post: "https://www.sffaudio.com/review-of-consumed-by-david-cronenberg"},
 {ID: "POST_53473", headline: "Review of The Scarifyers (9) The King Of Winter by Simon Barnard and Paul Morris", mention_post: "https://www.sffaudio.com/review-of-the-scarifyers-…e-king-of-winter-by-simon-barnard-and-paul-morris"},
 {ID: "POST_50792", headline: "Protecting Project Pulp: In Destiny's Clutch by Rafael Sabatini", mention_post: "https://www.sffaudio.com/protecting-project-pulp-in-destinys-clutch-by-rafael-sabatini"},
 {ID: "POST_47415", headline: "Review of The Invisible Hook: The Hidden Economics of Pirates by Peter T. Leeson", mention_post: "https://www.sffaudio.com/review-of-the-invisible-h…the-hidden-economics-of-pirates-by-peter-t-leeson"},
 {ID: "POST_46925", headline: "LibriVox: Shadows In The Moonlight by Robert E. Howard", mention_post: "https://www.sffaudio.com/librivox-shadows-in-the-moonlight-by-robert-e-howard"},
 {ID: "POST_46236", headline: "The Hemp (A Virginia Legend) by Stephen Vincent Benét", mention_post: "https://www.sffaudio.com/the-hemp-a-virginia-legend-by-stephen-vincent-benet"},
 {ID: "POST_42938", headline: "Review of Arguably: Essays by Christopher Hitchens", mention_post: "https://www.sffaudio.com/review-of-arguably-essays-by-christopher-hitchens"},
 {ID: "POST_34340", headline: "The SFFaudio Podcast #136 - READALONG: Neuromancer by William Gibson", mention_post: "https://www.sffaudio.com/the-sffaudio-podcast-135-readalong-neuromancer-by-william-gibson"},
 {ID: "POST_28145", headline: "FREE LISTENS REVIEW: The 39 Steps by John Buchan", mention_post: "https://www.sffaudio.com/free-listens-review-the-39-steps-by-john-buchan"},
 {ID: "POST_19615", headline: "LibriVox: The Frozen Pirate by W. Clark Russell", mention_post: "https://www.sffaudio.com/librivox-the-frozen-pirate-by-w-clark-russell"},
 {ID: "POST_17081", headline: "Aural Noir review of The Monster Of Florence by Douglas Preston and Mario Spezi", mention_post: "https://www.sffaudio.com/review-of-the-monster-of-florence-by-douglas-preston-and-mario-spezi"},
 {ID: "POST_15660", headline: "Aural Noir review of Killing Floor by Lee Child", mention_post: "https://www.sffaudio.com/aural-noir-review-of-killing-floor-by-lee-child"},
 {ID: "POST_15155", headline: "LibriVox: Treasure Island by Robert Louis Stevenson", mention_post: "https://www.sffaudio.com/librivox-treasure-island-by-robert-louis-stevenson"},
 {ID: "POST_12633", headline: "LibriVox: The Pirates Own Book by Charles Ellms", mention_post: "https://www.sffaudio.com/librivox-the-pirates-own-book-by-charles-ellms"},
 {ID: "POST_3978", headline: "Edgar Allan Poe all over BBC7 this week", mention_post: "https://www.sffaudio.com/edgar-allan-poe-all-over-bbc7-this-week"},
 {ID: "POST_3648", headline: "Review of Queen Of The Black Coast adapted from the story by Robert E. Howard", mention_post: "https://www.sffaudio.com/review-of-queen-of-the-bl…k-coast-adapted-from-the-story-by-robert-e-howard"},
 {ID: "POST_2651", headline: "Review of Starship: Pirate by Mike Resnick", mention_post: "https://www.sffaudio.com/review-of-starship-pirate-by-mike-resnick"}
];

var expected_html= '<div><label>Filter<inputvalue=""></label><label><inputtype="radio"name="radio_media">MediaTotals</label><label><inputtype="radio"name="radio_media">RSDs</label><label><inputtype="radio"name="radio_media">PDFs</label><label><inputtype="radio"name="radio_media"checked="">SFFaudioPodcasts</label><label><inputtype="radio"name="radio_media">BlogPosts</label><ul><li><span>PIRACY<ahref="http://www.sffaudio.com/?p=59406">#508TOPIC</a></span></li></ul></div>';


var search_term = 'piracy';
var radio_type = MEDIA_TYPES.PODCAST_TYPE;

    var my_test_json = JSON.stringify(my_test_json);
     var expected_html = expected_html.replace(/ /g, '');

module.exports= {
  search_term, radio_type, my_test_json, expected_html
}
