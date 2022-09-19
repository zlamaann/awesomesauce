import { Button, Dimmer, Form, Grid, Header, Input, Loader, TextArea, TextAreaProps } from "semantic-ui-react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import MDEditor, { commands } from '@uiw/react-md-editor';
import { toast } from "react-toastify";
import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { createArticle, updateArticle } from "../../redux";
import { Article } from "../../interface";



const ArticleForm: FC = () => {

    const { error, loading } = useAppSelector(state => state.articles)
    const { user } = useAppSelector(state => state.auth)

    const initialState: Article = {
        title: '',
        content: '# Supports markdown. Yay!',
        img: '',
        id: 0,
        user: {
            id: 0,
            email: "",
            name: "",
            surname: "",
            created: new Date()
        },
        commentsCount: 0,
        created: new Date(),
        changed: new Date()
    }


    const [article, setArticle] = useState(initialState);
    const [images, setImages] = useState([]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();



    const { id } = useParams();

    const { title, content, img } = article;

    const onChangeImage = (imageList: ImageListType) => {
        let img = imageList[0].dataURL;
        setArticle({...article, img: img ? img : ''})
        setImages(imageList as never[])
    }

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setArticle({ ...article, title: e.target.value })
    } 

    const onChangeContent = ( value: string | undefined ) => {
        setArticle({ ...article, content: value ? value : '' })
    } 

    const handleSubmitArticle  = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
       //e.preventDefault();

       if (!id) {
            dispatch(createArticle(article)).then(() => toast.success('Artikl uložen.'));
       } else {
            dispatch(updateArticle(article)).then(() => navigate(`/articles/${id}`));
       }
    }

    return (
        <div className="main article-create">
         
            <Grid>
                <Grid.Row><Header as="h1">Create new article</Header><Button type='submit' className="blue" onClick={handleSubmitArticle}  >Publish Article</Button></Grid.Row>
            </Grid>
            
            <Form loading={loading}>
                {error ? (<span>{ error }</span>) : null}
            <Form.Field required>
                <label>Article Title</label>
                <input placeholder='My First Article' value={title} onChange={onChangeTitle} />
            </Form.Field>
            <Form.Field required>
                <label>Featured image</label>
                <ImageUploading
                   value={images}
                   onChange={onChangeImage} >
                    {({ onImageUpload, onImageUpdate, onImageRemove }) => (
                        <div>
                            {!img ? (<Button onClick={onImageUpload} compact>Upload an image</Button>) : null}
                            <div>
                                <img src={img} alt="" width="100" />
                                <div>
                                {img ? (<Button onClick={() => onImageUpdate(0)} size='tiny' compact>Upload new</Button>) : null}
                                {img ? (<Button onClick={() => onImageRemove(0)} size='tiny' compact>Delete</Button>) : null}
                                </div>
                            </div>
                        </div>
                    )}
                </ImageUploading>
            </Form.Field>
            <Form.Field required>
                <label>Content</label>
                <MDEditor 
                    value={content} 
                    onChange={onChangeContent} 
                    preview='edit'
                    commands={[
                        commands.codeEdit, commands.codePreview
                      ]}
                    extraCommands={[]} />
            </Form.Field>
            
            </Form>
        </div>
    )
}

export default ArticleForm