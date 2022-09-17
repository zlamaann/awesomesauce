import { Component } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { Layout } from "./common/Layout";

export default class Login extends Component {

    render() {
        return (
            <div className="main login">
                <Grid textAlign='center' verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 368, maxHeight: 333}}>
                        <Form >
                            <Segment>
                                <Header as='h1' textAlign="left">Log In</Header>
                                <Form.Field>
                                    <label>E-mail</label>
                                    <input placeholder='E-mail' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input placeholder='Password' type="password" />
                                </Form.Field>
                                <Grid.Column floated='right'>
                                    <Button type='submit'>Log In</Button>
                                </Grid.Column>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

}