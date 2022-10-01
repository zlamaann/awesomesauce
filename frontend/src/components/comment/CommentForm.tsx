import { FC, useState } from "react";
import { Form, TextArea } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createComment, retrieveArticle } from "../../redux";
import { Article, Comment } from '../../interface';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CommentForm: FC<{commentParent?: Comment, article: Article}> = ({ commentParent, article }) => {

    const dispatch = useAppDispatch();

    const { user } = useAppSelector(state => state.auth);

    const initialComment: Comment = {
        id: 0,
        content: "",
        user: user,
        votes: [],
        replies: [],
        created: new Date(),
        article: article,
        commentParent: commentParent
    }

    const [comment, setComment] = useState(initialComment);

    const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { id, value } = e.target;

       setComment(state => ({
        ...state, 
        [id]: value
        }));
    }

    const onEnterComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
        //e.preventDefault;

        if(e.key === 'Enter')
            dispatch(createComment(comment)).then(() => { 
                toast('Comment added!');
                dispatch(retrieveArticle(article.id));
            });
    }

    return (
        <input required placeholder="Your awesome comment" id="content" defaultValue={comment.content} onChange={onChangeComment} onKeyDown={onEnterComment} />
    );
};

export default CommentForm;