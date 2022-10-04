import { FC } from "react";
import { Checkbox, Header, Table } from "semantic-ui-react";
import { useAppSelector } from "../../hooks/hooks";
import ArticlesListUserRow from "./ArticlesListUserRow";

 const ArticlesListUser: FC = () => {

  const { user } = useAppSelector((state) => state.auth);

  const { data } = useAppSelector((state) => state.articles);

  const articles = data.filter(article => article.user.id === user.id)

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