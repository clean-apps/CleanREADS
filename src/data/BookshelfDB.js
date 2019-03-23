class BookshelfDB {

  get_fav_books(callback) {
    let books_data = require('./GoogleBooksHarrari.json');
    callback(books_data.items);
    return books_data.items;
  }
  
  get_all_books(callback) {
    let books_data = require('./GoogleBooksPotter.json');
    callback(books_data.items);
    return books_data.items;
  }
}

export default BookshelfDB;
