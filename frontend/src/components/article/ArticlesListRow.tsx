import { FC } from "react";
import { Link } from "react-router-dom";
import { Item } from "semantic-ui-react";
import { Article } from "../../interface";

const ArticlesListRow: FC<{ article: Article }> = ({ article }) => {

  const created = new Date(article.created);

    return (
          <Item>
            <Item.Image size='small' src={article.img}/>
            <Item.Content>
              <Item.Header as='a'  to={`/articles/${article.id}`}>{article.title}</Item.Header>
              <Item.Meta>
                <span>{`${article.user.name} ${article.user.surname}  •  ${created.getDay()}/${created.getMonth()}/${created.getFullYear()}`}</span>
              </Item.Meta>
              <Item.Description>
                  {article.perex}
              </Item.Description>
              <Item.Extra>
                  <Item as={Link} to={`/articles/${article.id}`}>Read whole article</Item>
                  <span>{` ${article.comments ? article.comments.length : 0} comments` }</span>
              </Item.Extra>
            </Item.Content>
          </Item>
    );
};

export default ArticlesListRow;