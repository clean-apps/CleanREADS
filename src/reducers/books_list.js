import BookshelfDB from '../data/BookshelfDB';

var db = new BookshelfDB();

export default (state = { 'all_books':[], 'fav_books':[] }, action) => {

  switch (action.type) {

    case 'GET_ALL_BOOKS':
      var all_books_list = db.get_all_books((books) => {});
      return {
        'all_books': all_books_list,
        'fav_books': state.fav_books
      };

    case 'GET_FAV_BOOKS':
      var fav_books_list = db.get_fav_books((books) => {});
      return {
        'all_books': state.all_books,
        'fav_books': fav_books_list,
      };

    default:
      return state
  }
}
