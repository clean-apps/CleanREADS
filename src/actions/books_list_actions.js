import GoogleBooksAPI from "../data/GoogleBooksAPI";
import BookshelfDB from "../data/BookshelfDB";

var db = new BookshelfDB();
var api = new GoogleBooksAPI();

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
