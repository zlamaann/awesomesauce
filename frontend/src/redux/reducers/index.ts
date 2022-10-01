import { combineReducers } from 'redux';
import articleReducer from "./articleReducer";
import authReducer from "./authReducer";
import commentReducer from './commentReducer';
import voteReducer from './voteReducer';


const rootReducer = combineReducers ({
    articles: articleReducer,
    auth: authReducer,
    comments: commentReducer,
    votes: voteReducer
})

export default rootReducer;