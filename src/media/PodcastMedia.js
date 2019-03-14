
var {SharedMedia} = require('./SharedMedia');


var {Podcast} = require('./Podcast');


class PodcastMedia extends SharedMedia{

  constructor(options) {
    super(options)
    this.podcast = new Podcast(options)
  }

  static podcastOptions(podcast_obj){
    let media_options = SharedMedia.mediaOptions(podcast_obj)
    media_options.mp3 = podcast_obj['mp3_url']
    media_options.length = podcast_obj['hh_mm']
    media_options.episode = podcast_obj['episode_number']
    return media_options
  }

}

module.exports.PodcastMedia = PodcastMedia;
