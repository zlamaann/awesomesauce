import { FC } from "react";
import { Comment as CommentUI } from "semantic-ui-react";
import { Article, Comment } from "../../interface";
import CommentListRow from "./CommentListRow";

const CommentList: FC<{ comments: Comment[], article: Article }> = ({ comments, article }) => {
    return (
        <CommentUI.Group>
            {comments.map((comment, i) => {
                return <CommentListRow key={i} comment={comment} article={article}/>
            })}
        </CommentUI.Group>
    );
};

export default CommentList;