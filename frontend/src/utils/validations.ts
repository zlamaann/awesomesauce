
import { Article, RegisterUser } from "../interface";

export function validateRegister(user: RegisterUser) {
    const errors = [];

    const { name, surname, email, password } = user;
  
    if (name.length === 0) {
      errors.push("Name can't be empty");
    }
    if (surname.length === 0) {
        errors.push("Surname can't be empty");
      }
    if (email.length === 0) {
        errors.push("Email can't be empty");
      }
    if (email.split("").filter((x) => x === "@").length !== 1) {
      errors.push("Email should contain a @");
    }
    if (email.indexOf(".") === -1) {
      errors.push("Email should contain at least one dot");
    }
  
    if (password.length < 5) {
      errors.push("Password should be at least 5 characters long");
    }
  
    return errors;
  }

  export function validateArticle(article: Article) {
    const errors = [];

    const { title, perex, content, img } = article;
  
    if (title.length === 0) {
      errors.push("Title can't be empty");
    }
    if (perex.length === 0) {
        errors.push("Perex can't be empty");
      }
    if (content.length === 0) {
        errors.push("Content can't be empty");
      }
    if (img.length === 0) {
        errors.push("Image can't be empty");
      }
  
    return errors;
  }