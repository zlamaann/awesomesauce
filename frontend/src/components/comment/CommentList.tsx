import { FC, useEffect } from "react";
import { Comment as CommentUI } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Article, Comment } from "../../interface";
import { retrieveAllArticleComments } from "../../redux";
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