import { FC, useEffect, useState } from "react";
import { Form, TextArea } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createComment, retrieveAllArticleComments, retrieveAllComments, retrieveArticle } from "../../redux";
import { Article, Comment } from '../../interface';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CommentForm: FC<{commentParent?: Comment, article: Article, onReply?:(replied: boolean) => void}> = ({ commentParent, article, onReply }) => {

    const dispatch = useAppDispatch();

    const { id } = useParams();

    const { user } = useAppSelector(state => state.auth);
    const { error } = useAppSelector(state => state.comments);

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
        
        if(e.key === 'Enter') {
            if (!user) {
                toast.error("You must be logged in to add a comment");
                return;
            }
            
            dispatch(createComment(comment)).unwrap().then(() => { 
                toast.success('Comment added!');
                dispatch(retrieveArticle(Number(id)));
                dispatch(retrieveAllComments());
                if (onReply) onReply(false);
                setComment(initialComment)
            }).catch(error => toast.error(error.message));
        }
    }

    useEffect(() => {
        if (error) toast.error(error);
     }, [error])


    return (
        <input required placeholder="Your awesome comment" id="content" defaultValue={comment.content} onChange={onChangeComment} onKeyDown={onEnterComment} />
    );
};

export default CommentForm;