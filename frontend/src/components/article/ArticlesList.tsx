import { FC, useEffect } from "react";
import { Header, Item } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { retrieveAllArticles } from "../../redux/reducers/articleReducer";
import ArticlesListRow from "./ArticlesListRow";

 const ArticlesList: FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrieveAllArticles());
  }, [])

  const articles = useAppSelector((state) => state.articles.data);

    return (
      <div className="main articles">
        <Header as='h1' className="">Recent Articles</Header>
        <Item.Group>
          {Object.values(articles).map(article => (
            <ArticlesListRow key={article.id} article={article} />
          ))}
        </Item.Group>
      </div>
    );
};

export default ArticlesList;