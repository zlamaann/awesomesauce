import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Comment as CommentUI, Icon } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Article, Comment, Vote } from "../../interface";
import { createVote } from "../../redux";
import CommentForm from "./CommentForm";

const CommentActions: FC<{comment: Comment, article: Article}> = ({ comment, article }) => {

    const dispatch = useAppDispatch();

    const { user } = useAppSelector(state => state.auth);
    const votes = useAppSelector(state => state.votes.data.filter(vote => vote.comment.id === comment.id));

    const initialState:Vote = {
        id: 0,
        user: user,
        comment: comment,
        type: '',
        ip: '',
        created: new Date()
    }

    const [replying, setReplying] = useState(false);
    const [vote, setVote] = useState(initialState);
    const [voteCount, setVoteCount] = useState(0);

   const onReply = (replied: boolean) => {
    setReplying(replied);
   }

   const onClickVote = (type:string) => {
        if (!user) {
            toast.error("You must be logged in to vote");
            return;
        }

        setVote(state => ({
            ...state,
            type: type
        }));
   }

   useEffect(() => {
        if (vote.type != '')  
            dispatch(createVote(vote)).unwrap()
            .then(() => { 
                toast.success('Voted succesfully');
            }).catch(error =>  {
                toast.error(error.message)
            });
   }, [vote])

   useEffect(() => {
        const votesPlus = votes.filter(vote => vote.type === 'plus').length;
        const votesMinus = votes.filter(vote => vote.type === 'minus').length;
        setVoteCount(votesPlus - votesMinus);
    }, [votes])

    return (
        <CommentUI.Actions>
            <div>
                {voteCount} 
                <Icon link onClick={() => onClickVote('plus')} name='chevron up' /> 
                <Icon link onClick={() => onClickVote('minus')} name='chevron down' /> 
                <a onClick={() => {setReplying(!replying)}}>Reply</a>
            </div>
            {replying && <CommentForm commentParent={comment} article={article} onReply={onReply}/>}
        </CommentUI.Actions>
    );
};

export default CommentActions;