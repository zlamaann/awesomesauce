import { FC, useEffect } from "react";
import { Item } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { retrieveArticle } from "../../redux";

const ArticleDetail: FC = () => {

  const { id } = useParams();

  const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(retrieveArticle(Number(id)));
    }, )

    const articles = useAppSelector( state => state.articles.data);
    const article = articles[0];

    return (
          <Item>
            <Item.Image size='small' src={article.img}/>
            <Item.Content>
              <Item.Header as='a'>{article.title}</Item.Header>
              <Item.Meta>
                <span>{`${article.user.name} ${article.user.surname}  •  ${article.created}`}</span>
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

export default ArticleDetail;