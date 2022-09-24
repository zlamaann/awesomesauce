import { FC, useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { useAppDispatch } from "../../hooks/hooks";
import { register } from "../../redux";
import { RegisterUser, User } from "../../interface";
import { useNavigate } from "react-router-dom";

const Register: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState<RegisterUser>({
        email: '',
        password: '',
        name: '',
        surname: ''
    });
    

    const onChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { id, value } = e.target;

        setUser(state => ({
            ...state,
            [id]: value
        }))
    }

    const handleSubmitRegister  = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(user)).then(() => navigate(`/`));
     }

    return (
        <div className="main register">
            <Grid textAlign='center' verticalAlign="middle" >
                <Grid.Column style={{ maxWidth: 500}}>
                    <Form onSubmit={handleSubmitRegister}>
                        <Segment>
                            <Header as='h1' textAlign="left">Register</Header>
                            <Form.Field required>
                                <label>Name</label>
                                <input placeholder='Name' id="name" defaultValue={user.name} onChange={onChangeCredentials} />
                            </Form.Field>
                            <Form.Field required>
                                <label>Surname</label>
                                <input placeholder='Surname' id="surname" defaultValue={user.surname} onChange={onChangeCredentials} />
                            </Form.Field>
                            <Form.Field required>
                                <label>E-mail</label>
                                <input placeholder='E-mail' id="email" type="email" defaultValue={user.email} onChange={onChangeCredentials}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Password</label>
                                <input placeholder='Password' id="password" type="password" defaultValue={user.password} onChange={onChangeCredentials} />
                            </Form.Field>
                            <Grid.Column>
                                <Button type='submit' className="blue" >Register</Button>
                            </Grid.Column>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default  Register;