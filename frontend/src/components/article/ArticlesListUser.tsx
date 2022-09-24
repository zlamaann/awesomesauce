import { FC, useEffect } from "react";
import { Header, Item } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { retrieveArticleByUser } from "../../redux/reducers/articleReducer";
import ArticlesListRow from "./ArticlesListRow";
import ArticlesListUserRow from "./ArticlesListUserRow";

 const ArticlesListUser: FC = () => {

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const articles = useAppSelector((state) => state.articles.data);

  useEffect(() => {
    if (user) {
      dispatch(retrieveArticleByUser(user.id));
    }
  }, [])

  

    return (
      <div className="main articles">
        <Header as='h1' className="">My Articles</Header>
        <Item.Group>
          {Object.values(articles).map(article => (
            <ArticlesListUserRow key={article.id} article={article} />
          ))}
        </Item.Group>
      </div>
    );
};

export default ArticlesListUser;