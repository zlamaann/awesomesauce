import { FC } from "react";
import { Grid, Item, Image, Header, Divider, Form, Loader } from "semantic-ui-react";
import { useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import CommentList from "../comment/CommentList";
import MDEditor from "@uiw/react-md-editor";
import CommentForm from "../comment/CommentForm";

const ArticleDetail: FC = () => {

  const { id } = useParams();

  const comments  = useAppSelector( state => state.comments.data.filter(comment => comment.article.id === Number(id)))
  const { data, loading } = useAppSelector( state => state.articles);
  const { user } = useAppSelector( state => state.auth)

  const article = data.find(article => article.id === Number(id))
 
  if (!article) {
    if (loading) {
      return (
        <Loader/>
      )
    }
    return (
      <div className="main article-detail">
          <h2>Article not found!</h2>
        </div> 
    )
  }

  const created = new Date(article.created);

  return (
    <div className="main article-detail">
      <Grid divided>
        <Grid.Row columns={2}>
          <Grid.Column width={11}>
            <Header as='h1'>{article.title}</Header>
              <Header.Subheader>
                {`${article.user?.name} ${article.user?.surname}  •  ${created.getDay()}.${created.getMonth()}.${created.getFullYear()}`}
              </Header.Subheader>
            <Image size='huge' src={article.img}/>
            <MDEditor.Markdown source={article.content} />
            <Divider />
            <Header as='h3'>{`Comments (${article.comments ? article.comments.length : 0})`}</Header>
            <Form>
              <Form.Field >
                <CommentForm article={article} />
                <CommentList comments={comments} article={article} />
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