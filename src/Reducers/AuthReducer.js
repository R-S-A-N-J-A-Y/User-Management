const authReducer = (state, action) => {
  if (action.type === "Login") {
    console.log("Reducer");
    return {
      ...state,
      isAuthorized: true,
      username: action.payload.username,
      password: action.payload.password,
    };
  } else if (action.type === "Logout") {
    return {
      ...state,
      isAuthorized: false,
      username: null,
      password: null,
      profile: null,
    };
  } else if (action.type === "FetchProfile") {
    return {
      ...state,
      profile: action.payload,
    };
  }
};

export default authReducer;
