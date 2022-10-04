import { FC } from "react";
import { Header, Item } from "semantic-ui-react";
import { useAppSelector } from "../../hooks/hooks";
import ArticlesListRow from "./ArticlesListRow";

 const ArticlesList: FC = () => {

  const articles = useAppSelector((state) => state.articles.data);

    return (
      <div className="main articles">
        <Header as='h1' className="">Recent Articles</Header>
        <Item.Group>
          {articles.map(article => (
            <ArticlesListRow key={article.id} article={article} />
          ))}
        </Item.Group>
      </div>
    );
};

export default ArticlesList;