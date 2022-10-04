import { Button, Form, Grid, Header, Message} from "semantic-ui-react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import MDEditor, { commands } from '@uiw/react-md-editor';
import { toast } from "react-toastify";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { createArticle, updateArticle } from "../../redux";
import { Article } from "../../interface";
import { validateArticle } from "../../utils";



const ArticleForm: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const { error, data } = useAppSelector(state => state.articles)
    const { user, loading, isAuthenticated } = useAppSelector(state => state.auth)

    const initArticle = data.find(article => article.id === Number(id))

    const initialState: Article = {
        title: '',
        perex: '',
        content: '',
        img: '',
        id: 0,
        user: user,
        created: new Date(),
        changed: new Date()
    }

    const [article, setArticle] = useState<Article>(initArticle || initialState);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (error) toast.error(error);
      }, [error])

    const { title, perex, content, img } = article;

    const onChangeImage = (imageList: ImageListType) => {
        let img = imageList[0].dataURL;
        setArticle({...article, img: img ? img : ''})
        setImages(imageList as never[])
    }

    const onChangeContent = ( value: string | undefined ) => {
        setArticle({ ...article, content: value ? value : '' })
    } 

    const onChangeArticle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target; 
        setArticle(state => ({
            ...state,
            [id]: value
        }))
    }

    const handleSubmitArticle  = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorsValidated = validateArticle(article)
        setErrors(errorsValidated);
        if (errorsValidated.length > 0) {
            setShowError(true);
            return;
        }
        setShowError(false);
       if (!id) {
            dispatch(createArticle(article)).unwrap().then((result) => {
                toast.success('Article created.')
                navigate(`/articles/${result.id}`)
            }).catch(error => toast.error(error.message));
       } else {
            dispatch(updateArticle(article)).unwrap().then((result) => {
                toast.success('Article saved.')
                navigate(`/articles/${result.id}`)
            }).catch(error => toast.error(error.message));
       }
    }

    return (
        <div className="main article-create">
            <Form loading={loading} onSubmit={handleSubmitArticle} error={showError}>
            <Grid>
                <Grid.Row><Header as="h1">{!id ? 'Create new article' : 'Update article'}</Header><Button type='submit' className="blue"  >Publish Article</Button></Grid.Row>
            </Grid>
            <Message error>
                <ul>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                        ))}
                </ul>
            </Message>
            <Form.Field required>
                <label>Article Title</label>
                <input placeholder='My First Article' id="title" defaultValue={title} onChange={onChangeArticle} />
            </Form.Field>
            <Form.Field required>
                <label>Perex</label>
                <input placeholder='My first perex' id="perex" defaultValue={perex} onChange={onChangeArticle} />
            </Form.Field>
            <Form.Field required>
                <label>Featured image</label>
                <ImageUploading
                   value={images}
                   onChange={onChangeImage} >
                    {({ onImageUpload, onImageUpdate, onImageRemove }) => (
                        <div>
                        {!img ? (<Button onClick={onImageUpload} type='button' compact>Upload an image</Button>) : null}
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