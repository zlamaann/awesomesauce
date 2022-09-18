import { Routes, Route, Navigate } from 'react-router-dom';
import ArticlesList from '../article/ArticlesList'
import About from "../About";
import Login from "../auth/Login";
import ArticleForm from "../article/ArticleForm";
import { Article, User } from "../../model/types";
import ArticleDetail from "../article/ArticleDetail";
import { FC } from 'react';

const Main: FC = () => {

  const mockUser: User = {
    id: 1,
    email: 'example@web.com',
    name: 'Elisabeth',
    surname: 'Strain'
  }

  const mockArticle: Article = {
    id: 1,
    title: 'Why Do Cats Have Whiskers?',
    shortContent: "A cat's whiskers — or vibrissae — are a well-honed sensory tool that helps a cat see in the dark and steer clear of hungry predators. Whiskers are highly sensitive tactile hairs that grow in patterns on a cat's muzzle, above its eyes and elsewhere on its body, like the ears, jaw and forelegs",
    content: "Men might grow a beard or maintain a mustache just for extra style points, but the facial hair of the cat has nothing to do with fashion. A cat's whiskers — or vibrissae — are a well-honed sensory tool that helps a cat see in the dark and steer clear of hungry predators. Whiskers are highly sensitive tactile hairs that grow in patterns on a cat's muzzle, above its eyes and elsewhere on its body, like the ears, jaw and forelegs. At the root of each of these long, stiff hairs is a follicle loaded with nerves. By brushing its whiskers against an object, a cat can detect the precise location, size and texture of the object, even in the dark. This feature proves particularly useful for a cat trying to gauge whether it can fit into a tight space. Whiskers also detect changes in air currents, helping cats detect approaching dangers.  Whiskers not only make cats aware of their surroundings, but can also provide humans with some insight into their pet's state of mind. For example, a set of taut whiskers, pulled back across the face, is a good indication that Kitty feels threatened, while relaxed whiskers, pointing away from the face, indicate a content cat. Of course, cats aren't the only mammals with whiskers. Most mammalian species, including primates, are equipped with these extrasensory receptors. Biologists think mammals developed whiskers because they needed help sensing their environments at night. The first small mammals shared the world with dinosaurs and had to adapt to hunting nocturnally, when their predators were less active. Whiskers helped these hungry animals find food and navigate dark terrain. This evolutionary adaptation also helps to explain why the whiskers of many nocturnal or aquatic carnivores — like rats, seals and walruses — are so prominent.",
    img: '',
    user: mockUser,
    commentsCount: 4,
    created: new Date(),
    changed: new Date()
  }

    return (
      <Routes>
          <Route path='/' element={<ArticlesList article={mockArticle} />} />
          <Route path='/articles' element={<ArticlesList article={mockArticle} />} />
          <Route path='/articles/add' element={<ArticleForm />} />
          <Route path='/articles/:id' element={<ArticleDetail article={mockArticle} />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
      </Routes>
    );
};

export default Main;