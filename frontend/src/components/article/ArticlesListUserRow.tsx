import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Checkbox, Icon, Item, List, Table } from "semantic-ui-react";
import { useAppDispatch } from "../../hooks/hooks";
import { Article } from "../../interface";
import { deleteArticle } from "../../redux";

const ArticlesListUserRow: FC<{ article: Article}> = ({ article }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onUpdate = () => {
    navigate(`/articles/add/${article.id}`)
  }

  const onDelete = () => {
    dispatch(deleteArticle(article.id)).then(() => toast.success('Artikl smazán.'));
  }

    return (
      <Table.Row>
        <Table.Cell><Checkbox /></Table.Cell>
        <Table.Cell>{article.title}</Table.Cell>
        <Table.Cell>{article.perex}</Table.Cell>
        <Table.Cell>{`${article.user.name} ${article.user.surname}`}</Table.Cell>
        <Table.Cell>{article.comments ? article.comments.length : 0}</Table.Cell>
        <Table.Cell><Icon link name="pencil" size="large" onClick={onUpdate} /><Icon link name="trash" size="large"  onClick={onDelete} /></Table.Cell>
      </Table.Row>
    );
};

export default ArticlesListUserRow;