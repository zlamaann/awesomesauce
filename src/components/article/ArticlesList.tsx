import { Component } from "react";
import { Container, Header, Item, Label } from "semantic-ui-react";

export default class ArticlesList extends Component {

  render() {
    return (
      <div className="main articles">
        <Header as='h1' className="">Recent Articles</Header>
      
        <Item.Group>
          <Item>
            <Item.Image size='small' src='/images/wireframe/image.png' />
            <Item.Content>
              <Item.Header as='a'>Why Do Cats Have Whiskers?</Item.Header>
              <Item.Meta>
                <span>Elisabeth Strain</span>
                <span>•</span>
                <span>02/13/17</span>
              </Item.Meta>
              <Item.Description>
                  A cat's whiskers — or vibrissae — are a well-honed sensory tool that helps a cat see in the dark and steer clear of hungry predators. Whiskers are highly sensitive tactile hairs that grow in patterns on a cat's muzzle, above its eyes and elsewhere on its body, like the ears, jaw and forelegs
              </Item.Description>
              <Item.Extra>
                  <Item as='a'>Read whole article</Item>
                  <span>4 comments</span>
              </Item.Extra>
            </Item.Content>
          </Item>

          <Item>
            <Item.Image size='small' src='/images/wireframe/image.png' />
            <Item.Content>
              <Item.Header as='a'>Why Do Cats Have Whiskers?</Item.Header>
              <Item.Meta>
                <span>Elisabeth Strain</span>
                <span>•</span>
                <span>02/13/17</span>
              </Item.Meta>
              <Item.Description>
                  A cat's whiskers — or vibrissae — are a well-honed sensory tool that helps a cat see in the dark and steer clear of hungry predators. Whiskers are highly sensitive tactile hairs that grow in patterns on a cat's muzzle, above its eyes and elsewhere on its body, like the ears, jaw and forelegs
              </Item.Description>
              <Item.Extra>
                  <Item as='a'>Read whole article</Item>
                  <span>4 comments</span>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }
};

