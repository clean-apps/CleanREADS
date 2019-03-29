export const get_all_books_action = () => dispatch => {
  dispatch({
    type: "GET_ALL_BOOKS",
    payload: ""
  });
};

export const get_fav_books_action = () => dispatch => {
  dispatch({
    type: "GET_FAV_BOOKS",
    payload: ""
  });
};

export const get_book_by_id_action = vol_id => dispatch => {
  dispatch({
    type: "GET_BOOK_BY_ID",
    payload: vol_id
  });
};
