
import { RegisterUser } from "../interface";

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