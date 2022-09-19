import { FC } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

const Register: FC = () => {
    return (
        <div className="main register">
            <Grid textAlign='center' verticalAlign="middle" >
                <Grid.Column style={{ maxWidth: 500}}>
                    <Form >
                        <Segment>
                            <Header as='h1' textAlign="left">Register</Header>
                            <Form.Field required>
                                <label>Name</label>
                                <input placeholder='Name' />
                            </Form.Field>
                            <Form.Field required>
                                <label>Surname</label>
                                <input placeholder='Surname' />
                            </Form.Field>
                            <Form.Field required>
                                <label>E-mail</label>
                                <input placeholder='E-mail' />
                            </Form.Field>
                            <Form.Field required>
                                <label>Password</label>
                                <input placeholder='Password' type="password" />
                            </Form.Field>
                            <Grid.Column>
                                <Button type='submit' className="blue">Register</Button>
                            </Grid.Column>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default  Register;