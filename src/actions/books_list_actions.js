import GoogleBooksAPI from "../data/GoogleBooksAPI";
import BookshelfDB from "../data/BookshelfDB";

let db = BookshelfDB.getInstance();
let api = new GoogleBooksAPI();

export const get_all_books_action = () => dispatch => {
  db.get_all_books(books => {
    dispatch({
      type: "GET_ALL_BOOKS",
      payload: books
    });
  });
};

export const get_fav_books_action = () => dispatch => {
  db.get_fav_books(books => {
    dispatch({
      type: "GET_FAV_BOOKS",
      payload: books
    });
  });
};

export const get_book_by_id_action = vol_id => dispatch => {
  db.get_book_by_volid(vol_id, books => {
    dispatch({
      type: "GET_BOOK_BY_ID",
      payload: books
    });
  });
};

export const search_books = search_txt => dispatch => {
  api.search_books(search_txt, books => {
    dispatch({
      type: "SEARCH_BOOKS",
      payload: {
        books: books,
        search_txt: search_txt
      }
    });
  });
};

export const search_book_by_id_action = vol_id => dispatch => {
  api.search_book_by_volid(vol_id, book => {
    dispatch({
      type: "SEARCH_BOOK_BY_ID",
      payload: book
    });
  });
};

export const get_all_lists_action = () => dispatch => {
  db.get_all_lists(lists => {
    dispatch({
      type: "GET_LISTS",
      payload: lists
    });
  });
};

export const get_all_category_action = () => dispatch => {
  db.get_all_categories(categories => {
    dispatch({
      type: "GET_CATEGORIES",
      payload: categories
    });
  });
};

export const add_book_tolist = (that_book, list_name, is_fav) => dispatch => {
  db.add_book(that_book, list_name, is_fav, book => {
    dispatch({
      type: "ADD_BOOK",
      payload: book
    });
  });
};

export const mark_book_asfav = (void_id, is_fav) => dispatch => {
  db.mark_fav(mark_book_asfav, is_fav, that_book => {
    dispatch({
      type: "MARK_FAV",
      payload: that_book
    });
  });
};
