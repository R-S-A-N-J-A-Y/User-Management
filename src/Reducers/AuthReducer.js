const authReducer = (state, action) => {
  if (action.type === "Login") {
    console.log("Reducer");
    return {
      ...state,
      isAuthorized: true,
      username: action.payload,
    };
  } else if (action.type === "Logout") {
    return {
      ...state,
      isAuthorized: false,
      username: null,
      profile: null,
    };
  }
};

export default authReducer;
