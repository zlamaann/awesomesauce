import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comment as CommentUI, Divider, Icon, Item } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Article, Comment } from "../../interface";
import { retrieveArticle } from "../../redux";
import CommentForm from "./CommentForm";

const CommentActions: FC<{comment: Comment, article: Article}> = ({ comment, article }) => {

    const dispatch = useAppDispatch();

    const [replying, setReplying] = useState(false);

   const { data } = useAppSelector(state => state.articles);

   article = data[0];

    return (
        <CommentUI.Actions>
            <div>
                {comment.votes ? comment.votes.length : 0} 
                <Icon link name='chevron up' /> 
                <Icon link name='chevron down' /> 
                <a onClick={() => {setReplying(!replying)}}>Reply</a>
            </div>
            {replying && <CommentForm commentParent={comment} article={article} />}
        </CommentUI.Actions>
    );
};

export default CommentActions;