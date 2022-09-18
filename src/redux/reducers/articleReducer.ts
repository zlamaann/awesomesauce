import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ArticleService from '../../api/article/ArticleService';
import { Article } from '../../model/types';


interface ArticleState {
    loading: boolean;
    error?: string;
    data: Article[];
}

const initialState: ArticleState = {
    loading: false,
    data: []
}

export const createArticle = createAsyncThunk(
    "articles/create",
    async (article: Article) => {
      const res = await ArticleService.create(article);
      return res.data;
    }
  );
  
  export const retrieveAllArticles = createAsyncThunk(
    "articles/retrieve/all",
    async () => {
      const res = await ArticleService.getAll();
      return res.data;
    }
  );

  export const retrieveArticle = createAsyncThunk(
    "articles/retrieve",
    async (id: number) => {
      const res = await ArticleService.get(id);
      return res.data;
    }
  );
  
  export const updateArticle = createAsyncThunk<Article, { id: string } & Partial<Article>>(
    "articles/update",
    async ( article ) => {
        const { id, ...fields } = article
      const res = await ArticleService.update(id, fields);
      return res.data;
    }
  );
  
  export const deleteArticle = createAsyncThunk(
    "articles/delete",
    async ( id: number ) => {
      await ArticleService.delete(id);
      return { id };
    }
  );

const articleSlice = createSlice({
    name: 'articles',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create new article
        builder.addCase(createArticle.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createArticle.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data.push(payload);
        });
        builder.addCase(createArticle.rejected, (state, action) => {
            state.error = action.error.message
        });
        // Retrieve all articles
        builder.addCase(retrieveAllArticles.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(retrieveAllArticles.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
        });
        builder.addCase(retrieveAllArticles.rejected, (state, action) => {
            state.error = action.error.message
        });
        // Retrieve article
        builder.addCase(retrieveArticle.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(retrieveArticle.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = [payload];
        });
        builder.addCase(retrieveArticle.rejected, (state, action) => {
            state.error = action.error.message
        });
        // Update article
        builder.addCase(updateArticle.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateArticle.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data[payload.id] = payload;
        });
        builder.addCase(updateArticle.rejected, (state, action) => {
            state.error = action.error.message
        });
        // Delete article
        builder.addCase(deleteArticle.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteArticle.fulfilled, (state, { payload }) => {
            state.loading = false;
            let index = state.data.findIndex(({ id }) => id === payload.id);
            state.data.splice(index);
        });
        builder.addCase(deleteArticle.rejected, (state, action) => {
            state.error = action.error.message
        });
    }
})

export default articleSlice.reducer;
