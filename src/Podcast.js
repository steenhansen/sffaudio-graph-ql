class Podcast {
  constructor(options) {
    let {description, mp3, length, episode} = options
    this.description = description;
    this.mp3 = mp3;
    this.length = length;
    this.episode = episode;
  }
}
module.exports.Podcast = Podcast;