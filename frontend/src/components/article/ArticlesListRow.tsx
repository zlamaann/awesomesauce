import { FC } from "react";
import { Item } from "semantic-ui-react";
import { Article } from "../../interface";

const ArticlesListRow: FC<{ article: Article}> = ({ article }) => {

    return (
          <Item>
            <Item.Image size='small' src={article.img}/>
            <Item.Content>
              <Item.Header as='a'>{article.title}</Item.Header>
              <Item.Meta>
                <span>{`${article.user.name} ${article.user.surname}  •  ${article.created.getDay()}/${article.created.getMonth()}/${article.created.getFullYear()}`}</span>
              </Item.Meta>
              <Item.Description>
                  {article.content}
              </Item.Description>
              <Item.Extra>
                  <Item as='a'>Read whole article</Item>
                  <span>{` ${article.commentsCount} comments` }</span>
              </Item.Extra>
            </Item.Content>
          </Item>
    );
};

export default ArticlesListRow;