export default (
  state = {
    all_books: [],
    fav_books: [],
    selected_book: {},
    searched_books: [],
    search_text: "",
    list_items: [],
    category_items: []
  },
  action
) => {
  switch (action.type) {
    case "GET_ALL_BOOKS":
      return {
        ...state,
        all_books: action.payload
      };

    case "GET_FAV_BOOKS":
      return {
        ...state,
        fav_books: action.payload
      };

    case "GET_BOOK_BY_ID":
      return {
        ...state,
        selected_book: action.payload
      };

    case "SEARCH_BOOKS":
      return {
        ...state,
        searched_books: action.payload.books,
        search_text: action.payload.search_txt
      };

    case "GET_LISTS":
      return {
        ...state,
        list_items: action.payload
      };

    case "GET_CATEGORIES":
      return {
        ...state,
        category_items: action.payload
      };

    default:
      return state;
  }
};
