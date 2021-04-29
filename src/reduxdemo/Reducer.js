export var AuthReducer = function (state =
    {
        isloggedin: (localStorage.token ? true : false)
    }, action) {
    switch (action.type) {
        case "LOGIN": {
            state = { ...state } //backup old state
            state.isloggedin = true
            return state
        }
        default: return state
    }
}