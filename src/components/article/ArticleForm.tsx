import { Button, Form, Grid, Header, Input, TextArea } from "semantic-ui-react";
import { FC, useState } from "react";

const ArticleForm: FC = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('# Supports markdown. Yay!')

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    return (
        <div className="main article-create">
            <Grid>
                <Grid.Row><Header as="h1">Create new article</Header><Button type='submit' className="blue">Publish Article</Button></Grid.Row>
            </Grid>
            
            <Form>
            <Form.Field>
                <label>Article Title</label>
                <input placeholder='My First Article' value={title} onChange={onChangeTitle} />
            </Form.Field>
            <Form.Field>
                <label>Content</label>
                <Input type="file"></Input>
            </Form.Field>
            <Form.Field>
                <label>Content</label>
                <TextArea onChange={onChangeContent}>{content}</TextArea>
            </Form.Field>
            
            </Form>
        </div>
    )
}

export default ArticleForm