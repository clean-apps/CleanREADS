import Dexie from "dexie";

class BookshelfDB {
  _instance = null;
  db = new Dexie("BookshelfDB");

  constructor() {
    this.db.version(1).stores({
      lists: "++id, &list_name",
      all_books: "++id, &vol_id, category, list_name, is_fav"
    });
  }

  static getInstance() {
    if (BookshelfDB._instance == null) {
      BookshelfDB._instance = new BookshelfDB();
    }

    return this._instance;
  }

  add_book(each_book, list_name, is_fav, callback) {
    let book_to_add = {
      vol_id: each_book.vol_id,
      title: each_book.title,
      authors: each_book.authors,
      short_desc: each_book.short_desc,
      desc: each_book.desc.description,
      thumbnail: each_book.thumbnail,
      rating: each_book.rating,
      category: each_book.category,
      gbooks_url: each_book.gbooks_url,
      list_name: list_name,
      is_fav: is_fav
    };

    this.db.all_books.add(book_to_add).then(() => {
      this.get_book_by_volid(each_book.vol_id, callback);
    });
  }

  async get_all_books(callback) {
    var books_data = await this.db.all_books.toArray();
    callback(books_data);
    return books_data;
  }

  async get_book_by_volid(vol_id, callback) {
    var that_book = await this.db.all_books
      .where("vol_id")
      .equals(vol_id)
      .first();
    callback(that_book);
    return that_book;
  }

  async get_books_by_list(list_name, callback) {
    var those_books = await this.db.all_books
      .where("list_name")
      .equals(list_name)
      .toArray();
    callback(those_books);
    return those_books;
  }

  async get_book_by_category(category_name, callback) {
    var those_books = await this.db.all_books
      .where("category")
      .equals(category_name)
      .toArray();
    callback(those_books);
    return those_books;
  }

  async get_fav_books(callback) {
    var those_books = await this.db.all_books
      .where("is_fav")
      .equals("true")
      .toArray();
    callback(those_books);
    return those_books;
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

  async mark_fav(vol_id, is_fav, callback) {
    var that_book = await this.db.all_books
      .where("vol_id")
      .equals(vol_id)
      .modify({ is_fav: is_fav })
      .catch(function(err) {
        console.log(err);
      });
    callback(that_book);
    return that_book;
  }
}

export default BookshelfDB;
