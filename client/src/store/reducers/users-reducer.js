let DEFAULT_USER_STATE = {
    data: {
        _id: null,
        email: null,
        firstname: null,
        lastname: null,
        history: [],
        verified: null,
    },
    auth: null,
    cart: [],
};

const userReducer = (state = DEFAULT_USER_STATE, { type, payload }) => {
    switch (type) {
        default:
            return state;
    }
};

export default userReducer;
