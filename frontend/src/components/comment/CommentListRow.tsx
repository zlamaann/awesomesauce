import { FC } from "react";
import { Comment as CommentUI } from "semantic-ui-react";
import { Article, Comment } from "../../interface";
import { timeAgo } from "../../utils";
import CommentActions from "./CommentActions";
import CommentList from "./CommentList";

const CommentListRow: FC<{ comment: Comment, article: Article }> = ( { comment, article } ) => {

    
    const created = new Date(comment.created);

    return (
        <CommentUI>
            <CommentUI.Content>
                <CommentUI.Author as='a'>{`${comment.user.name} ${comment.user.surname}`}</CommentUI.Author>
                <CommentUI.Metadata><div>{timeAgo(created)}</div></CommentUI.Metadata>
                <CommentUI.Text>{comment.content}</CommentUI.Text>
                <CommentActions comment={comment} article={article} />
            </CommentUI.Content>
            {comment.replies && comment.replies.length > 0 && ( <CommentList article={article} /> )}
        </CommentUI>
    );
};

export default CommentListRow;