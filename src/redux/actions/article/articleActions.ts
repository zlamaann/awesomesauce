import { Article } from "../../../model/types";
import { ActionType } from "./articleTypes";

interface GetArticlesAction {
    type: ActionType.GET_ARTICLES;
}

interface GetArticlesActionSuccess {
    type: ActionType.GET_ARTICLES_SUCCESS;
    payload: Article[];
}

interface GetArticlesActionError {
    type: ActionType.GET_ARTICLES_ERROR;
    payload: string;
}

export type Action = GetArticlesAction | GetArticlesActionSuccess | GetArticlesActionError;