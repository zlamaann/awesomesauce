import { FC, useEffect } from "react";
import { Comment as CommentUI } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Article } from "../../interface";
import { retrieveAllArticleComments } from "../../redux";
import CommentListRow from "./CommentListRow";

const CommentList: FC<{ article: Article }> = ({ article }) => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(retrieveAllArticleComments())
    }, [])

    const { data }  = useAppSelector( state => state.comments)
    const comments = data;

    return (
        <CommentUI.Group>
            {comments.map((comment, i) => (
                <CommentListRow key={i} comment={comment} article={article}/>
            ))}
        </CommentUI.Group>
    );
};

export default CommentList;