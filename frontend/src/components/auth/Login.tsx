import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Form, Grid, Header, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { login } from "../../redux";

const Login: FC = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
      });

    const { error, loading } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { id, value } = e.target;

        setCredentials(state => ({
            ...state,
            [id]: value
        }))
    }

    const handleSubmitLogin  = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(credentials)).then(() => navigate(`/`));
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
                                <input placeholder='E-mail' value={credentials.email} onChange={onChangeCredentials} />
                            </Form.Field>
                            <Form.Field required>
                                <label>Password</label>
                                <input placeholder='Password' type="password" value={credentials.password} onChange={onChangeCredentials} />
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