import { FC } from "react";
import { Header, Item } from "semantic-ui-react";
import { Article } from "../../model/types";
import ArticlesListRow from "./ArticlesListRow";

 const ArticlesList: FC<{ article: Article}> = ({ article }) => {

    return (
      <div className="main articles">
        <Header as='h1' className="">Recent Articles</Header>
        <Item.Group>
          <ArticlesListRow article={article} />
          <ArticlesListRow article={article}/>
        </Item.Group>
      </div>
    );
};

export default ArticlesList;