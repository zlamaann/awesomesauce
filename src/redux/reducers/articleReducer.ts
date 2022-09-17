import { Article } from "../../model/types";
import { Action } from "../actions/article/articleActions";
import { ActionType } from "../actions/article/articleTypes";


interface ArticleState {
    loading: boolean;
    error: string | null;
    data: Article[];
}

const initialState = {
    loading: false,
    error: null,
    data: []
}

const articleReducer = (
        state: ArticleState = initialState, 
        action: Action
    ): ArticleState => {
        switch (action.type) {
            case ActionType.GET_ARTICLES:
                return {
                    loading: true,
                    error: null,
                    data: []
                }
            case ActionType.GET_ARTICLES_SUCCESS:
                return {
                    loading: false,
                    error: null,
                    data: action.payload
                }
            case ActionType.GET_ARTICLES_ERROR:
                return {
                    loading: false,
                    error: action.payload,
                    data: []
                }
            default:
                return state;
        }
};

export default articleReducer;

