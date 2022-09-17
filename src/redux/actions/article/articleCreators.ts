import { ActionType } from './articleTypes';
import { Action } from './articleActions'

import * as articleAPI from '../../../api/article'
import { Dispatch } from 'react';

export const getAllArticles = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_ARTICLES
        })

        try {

            const res = await articleAPI.getAllArticles();

            dispatch({
                type: ActionType.GET_ARTICLES_SUCCESS,
                payload: res?.data
            })

        } catch (err) {
            if (err instanceof Error) {
                dispatch({
                    type: ActionType.GET_ARTICLES_ERROR,
                    payload: err.message
                });
            };
        }
    }
}