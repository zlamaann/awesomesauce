import { Component } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import ArticlesList from '../article/ArticlesList'
import About from "../About";
import Login from "../Login";

export default class Main extends Component {

  render() {
    return (
      <Routes>
          <Route path='/' element={<ArticlesList />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
      </Routes>
    );
  }
};
