import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Checkbox, Header, Item, List, Table } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { retrieveArticleByUser } from "../../redux/reducers/articleReducer";
import ArticlesListRow from "./ArticlesListRow";
import ArticlesListUserRow from "./ArticlesListUserRow";

 const ArticlesListUser: FC = () => {

  const dispatch = useAppDispatch();

  const { id } = useParams();

  const { user } = useAppSelector((state) => state.auth);
  const articles = useAppSelector((state) => state.articles.data) || [];

  useEffect(() => {
    if (id) {
      dispatch(retrieveArticleByUser(Number(id)));
    }
  }, [])

    return (
      <div className="main articles">
        <Header as='h1' className="">My Articles</Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><Checkbox /></Table.HeaderCell>
              <Table.HeaderCell>Article title</Table.HeaderCell>
              <Table.HeaderCell>Perex</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell># of comments</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {articles?.map((article, i) => (
              <ArticlesListUserRow key={i} article={article} /> 
            ))}
          </Table.Body>
        </Table>
      </div>
    );
};

export default ArticlesListUser;