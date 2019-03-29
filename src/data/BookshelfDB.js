class BookshelfDB {
  get_book_by_volid(vol_id, callback) {
    let all_books_data = require("./GoogleBooksPotter.json");
    let fav_books_data = require("./GoogleBooksHarrari.json");
    let books_data = all_books_data.items.concat(fav_books_data.items);

    var that_book = books_data.find(each_book => each_book.id === vol_id);
    callback(that_book);
    return that_book;
  }

  get_fav_books(callback) {
    let books_data = require("./GoogleBooksHarrari.json");
    callback(books_data.items);
    return books_data.items;
  }

  get_all_books(callback) {
    let books_data = require("./GoogleBooksPotter.json");
    callback(books_data.items);
    return books_data.items;
  }
}

export default BookshelfDB;
