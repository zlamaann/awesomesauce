import { FC, useEffect, useState } from "react";
import { Grid, GridRow, Item, Image, Header, Divider, Form } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { retrieveArticle } from "../../redux";
import CommentList from "../comment/CommentList";
import MDEditor from "@uiw/react-md-editor";
import CommentForm from "../comment/CommentForm";

const ArticleDetail: FC = () => {

  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrieveArticle(Number(id)));
  }, [dispatch])

  const articles = useAppSelector( state => state.articles.data );
  const { loading } = useAppSelector( state => state.auth )
  const article = articles[0];
  const created = new Date(article.created);

  return (
    <div className="main article-detail">
      <Grid divided>
        <Grid.Row columns={2}>
          <Grid.Column width={11}>
            <Header as='h1'>{article.title}</Header>
              <Header.Subheader>
                {`${article.user.name} ${article.user.surname}  •  ${created.getDay()}.${created.getMonth()}.${created.getFullYear()}`}
              </Header.Subheader>
            <Image size='huge' src={article.img}/>
            <MDEditor.Markdown source={article.content} />
            <Divider />
            <Header as='h3'>{`Comments (${article.comments ? article.comments.length : 0})`}</Header>
            <Form>
              <Form.Field >
                <CommentForm article={article} />
                <CommentList article={article} />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as='h3'>Related articles</Header>
            <Item.Group>
              {article.related?.map(( article, i ) => (
                <Item>
                  <Item.Content>
                    <Item.Header>{article.title}</Item.Header>
                    <Item.Description>
                        {article.perex}
                    </Item.Description>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>     
  );
};

export default ArticleDetail;