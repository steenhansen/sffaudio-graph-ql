class PossibleBook {
  constructor(options) {
    let {author, title} = options
    this.author = author;
    this.title = title;
  }
}

module.exports.PossibleBook = PossibleBook;
