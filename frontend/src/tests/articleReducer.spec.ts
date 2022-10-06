import { Article } from "../interface";
import { createArticle, deleteArticle, retrieveAllArticles, updateArticle } from "../redux";
import store from "../redux/store/store"



test('Updates article title, perex, content', () => {
    let state = store.getState().articles;
    const user = store.getState().auth.user
    const unchangedArticle = state.data.find(article => article.id === 4);
    expect(unchangedArticle?.title).toBe('My new article');
    expect(unchangedArticle?.perex).toBe('Loooooooong perex');
    expect(unchangedArticle?.content).toBe('Even looooonger text');

    const updatedState: Article = {
        title: 'My new updated article',
        perex: 'Loooooooong updated perex',
        content: 'Even looooonger updated text',
        img: '',
        id: 0,
        user: user,
        created: new Date(),
        changed: new Date()
    }

    store.dispatch(updateArticle(updatedState));
    state = store.getState().articles;
    const changedArticle = state.data.find(article => article.id === 4);
    expect(changedArticle?.title).toBe('My new updated article');
    expect(changedArticle?.perex).toBe('Loooooooong updated perex');
    expect(changedArticle?.content).toBe('Even looooonger updated text');

    const initialState = { ...updatedState, 
        title: 'My new article',
        perex: 'Loooooooong perex',
        content: 'Even looooonger text',
    }

    store.dispatch(updateArticle(initialState));
    state = store.getState().articles;
    const initArticle = state.data.find(article => article.id === 4);
    
    expect(initArticle).toBe(unchangedArticle);
});

test('Deletes an article with id', () => {
    let state = store.getState().articles;
    const initArticlesCount = state.data.length;

    store.dispatch(deleteArticle(4));
    state = store.getState().articles;

    expect(state.data.length).toBeLessThan(initArticlesCount);
})

test('Adds new article', () => {
    let state = store.getState().articles;
    const user = store.getState().auth.user
    const initArticlesCount = state.data.length;

    const newArticle: Article = {
        title: 'My new article',
        perex: 'Perex',
        content: 'Loooong insteresting content',
        img: '',
        id: 0,
        user: user,
        created: new Date(),
        changed: new Date()
    }

    store.dispatch(createArticle(newArticle));
    state = store.getState().articles;

    expect(state.data.length).toBeGreaterThan(initArticlesCount);
})