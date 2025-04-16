const authReducer = (state, action) => {
  if (action.type === "Login") {
    return {
      ...state,
      isAuthorized: true,
      username: action.payload,
    };
  }
};

export default authReducer;
