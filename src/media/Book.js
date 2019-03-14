class Book {
  constructor(options) {
    let {author, title} = options
    this.author = author;
    this.title = title;
  }
}

module.exports.Book = Book;
