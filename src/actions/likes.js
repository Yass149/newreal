import axios from "axios";
const baseUrl = "http://localhost:4000";

const LIKE_ADVERT = "LIKE_ADVERT";
const DISLIKE_ADVERT = "DISLIKE_ADVERT";

const likeAdvertSuccess = liked => {
  if (liked.removed) {
    return {
      type: DISLIKE_ADVERT,
      advertId: liked.advertId
    };
  } else {
    return {
      type: LIKE_ADVERT,
      liked
    };
  }
};

export const likeAdvert = id => (dispatch, getState) => {
  const { userReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .get(`${baseUrl}/advert/${id}/like`)
    .then(response => {
      dispatch(likeAdvertSuccess(response.data));
    })
    .catch(err => console.log(err));
};