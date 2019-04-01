import Dexie from "dexie";

class BookshelfDB {
  db = new Dexie("BookshelfDB");

  constructor() {
    this.db.version(1).stores({
      lists: "++id, list_name"
    });

    this.db.version(2).stores({
      lists: "++id, list_name",
      fav_books: "++id, category",
      all_books: "++id, category, list_name"
    });

    this.get_fav_books(books => {
      if (!books) {
        let fav_books_data = require("./GoogleBooksHarrari.json");
        fav_books_data.items.map(each_book => {
          this.add_fav(each_book, () => {});
        });
      }
    });

    this.get_all_books(books => {
      if (!books) {
        let all_books_data = require("./GoogleBooksPotter.json");
        all_books_data.items.map(each_book => {
          this.add_book(each_book, "MYLIST1", () => {});
        });

        let fav_books_data = require("./GoogleBooksHarrari.json");
        fav_books_data.items.map(each_book => {
          this.add_fav(each_book, () => {});
        });
      }
    });
  }

  add_book(each_book, list_name, callback) {
    this.db.all_books
      .add({
        vol_id: each_book.id,
        title: each_book.volumeInfo.title,
        authors: each_book.volumeInfo.authors
          ? each_book.volumeInfo.authors.join()
          : "",
        short_desc: each_book.searchInfo
          ? each_book.searchInfo.textSnippet
          : "",
        desc: each_book.volumeInfo.description,
        thumbnail: each_book.volumeInfo.imageLinks
          ? each_book.volumeInfo.imageLinks.smallThumbnail
          : "",
        rating: each_book.volumeInfo.averageRating,
        category: each_book.volumeInfo.categories
          ? each_book.volumeInfo.categories.join()
          : "",
        gbooks_url: each_book.volumeInfo.previewLink,
        list_name: list_name
      })
      .then(() => {
        this.get_fav_books(callback);
      });
  }

  async get_all_books(callback) {
    var books_data = await this.db.all_books.toArray();
    callback(books_data);
    return books_data;
  }

  async get_book_by_volid(vol_id, callback) {
    var that_book = await this.db.all_books.where("vol_id").equals(vol_id);
    callback(that_book);
    return that_book;
  }

  async get_book_by_list(list_name, callback) {
    var that_book = await this.db.all_books
      .where("list_name")
      .equals(list_name);
    callback(that_book);
    return that_book;
  }

  async get_book_by_category(category_name, callback) {
    var that_book = await this.db.all_books
      .where("category")
      .equals(category_name);
    callback(that_book);
    return that_book;
  }

  add_fav(each_book, callback) {
    this.db.fav_books
      .add({
        vol_id: each_book.id,
        title: each_book.volumeInfo.title,
        authors: each_book.volumeInfo.authors
          ? each_book.volumeInfo.authors.join()
          : "",
        short_desc: each_book.searchInfo
          ? each_book.searchInfo.textSnippet
          : "",
        desc: each_book.volumeInfo.description,
        thumbnail: each_book.volumeInfo.imageLinks
          ? each_book.volumeInfo.imageLinks.smallThumbnail
          : "",
        rating: each_book.volumeInfo.averageRating,
        category: each_book.volumeInfo.categories
          ? each_book.volumeInfo.categories.join()
          : "",
        gbooks_url: each_book.volumeInfo.previewLink
      })
      .then(() => {
        this.get_fav_books(callback);
      });
  }

  async get_fav_books(callback) {
    //let books_data = require("./GoogleBooksHarrari.json");
    var books_data = await this.db.fav_books.toArray();
    callback(books_data);
    return books_data;
  }

  async add_list(label, callback) {
    this.db.lists
      .add({
        text: label,
        icon: "list"
      })
      .then(() => {
        this.get_all_lists(callback);
      });
  }

  async get_all_lists(callback) {
    let default_lists = [
      { text: "To Read", icon: "list" },
      { text: "Currently Reading", icon: "list" },
      { text: "Completed", icon: "list" }
    ];

    var custom_lists = await this.db.lists.toArray();
    var all_lists = default_lists.concat(custom_lists);
    callback(all_lists);
    return all_lists;
  }

  get_all_categories(callback) {
    let category_items = require("./CategoryItems.json");
    callback(category_items);
    return category_items;
  }
}

export default BookshelfDB;
