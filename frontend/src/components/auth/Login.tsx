import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Form, Grid, Header, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { login } from "../../redux";

const Login: FC = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
      });

    const { error, loading, user } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChangeCredentials = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { id, value } = e.target;

        setCredentials(creds => ({
            ...creds,
            [id]: value
        }))
    }

    useEffect(() => {
        if (user) {
            navigate(`/articles/user/${user.id}`)
        }
    }, [])


    const handleSubmitLogin  = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(credentials));
     }

    return (
        <div className="main login">
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 368, maxHeight: 333}}>
                    <Form onSubmit={handleSubmitLogin}>
                        <Segment>
                            <Header as='h1' textAlign="left">Log In</Header>
                            <Form.Field required>
                                <label>E-mail</label>
                                <input placeholder='E-mail' id="email" defaultValue={credentials.email} onChange={onChangeCredentials} />
                            </Form.Field>
                            <Form.Field required>
                                <label>Password</label>
                                <input placeholder='Password' id="password" type="password" defaultValue={credentials.password} onChange={onChangeCredentials} />
                            </Form.Field>
                            <Grid.Column>
                                <Button type='submit' className="blue">Log In</Button>
                                <Divider horizontal>Or</Divider>
                                <Button type='submit' as={Link} to='/register'>Register</Button>
                            </Grid.Column>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default  Login ;