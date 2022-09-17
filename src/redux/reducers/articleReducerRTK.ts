import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../../model/types';

interface ArticleState {
    loading: boolean;
    error?: string;
    data: Article[];
}

const initialArticleState: ArticleState = {
    loading: false,
    data: []
}

const articleSlice = createSlice({
    name: 'article',
    initialState: initialArticleState,
    reducers: {
        getArticles: (state) => {
            state.loading = true;
        },
        getArticlesSuccess: (state, action:PayloadAction<Article[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        getArticlesError: (state, action:PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.data = [];
        }
    }
})


export default articleSlice.reducer;
