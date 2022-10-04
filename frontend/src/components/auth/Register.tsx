import { FC, useEffect, useState } from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { register } from "../../redux";
import { RegisterUser, User } from "../../interface";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../../utils";
import { ToastContainer, toast } from 'react-toastify';
import { unwrapResult } from "@reduxjs/toolkit";


const Register: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { error } = useAppSelector(state => state.auth)

    const [errors, setErrors] = useState<string[]>([]);
    const [showError, setShowError] = useState(false);

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
        const errorsValidated = validateRegister(user)
        setErrors(errorsValidated);
        if (errorsValidated.length > 0) {
            setShowError(true);
            return;
        }
        dispatch(register(user)).then(unwrapResult)
        .then(result => {
            toast.success('User registered')
            navigate('/')
        })
        .catch(error => {
            toast.error(error)});
     }

     useEffect(() => {
        if (error) toast.error(error)
     }, [error])

    return (
        <div className="main register">
            <Grid textAlign='center' verticalAlign="middle" >
                <Grid.Column style={{ maxWidth: 500}}>
                    <Segment>
                        <Form onSubmit={handleSubmitRegister} error={showError}>
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
                                <input placeholder='E-mail' id="email" type="email" defaultValue={user.email} onChange={onChangeCredentials} />
                            </Form.Field>
                            <Form.Field required>
                                <label>Password</label>
                                <input placeholder='Password' id="password" type="password" defaultValue={user.password} onChange={onChangeCredentials} />
                            </Form.Field>
                            <Message error>
                                <ul>
                                    {errors.map((error) => (
                                        <li key={error}>{error}</li>
                                        ))}
                                </ul>
                            </Message>
                            <Grid.Column>
                                <Button type='submit' className="blue" >Register</Button>
                            </Grid.Column>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default  Register;