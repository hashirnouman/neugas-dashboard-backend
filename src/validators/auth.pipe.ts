import { check } from "express-validator";
export const signupValidationRules = () => {
  return [
    check("firstname").notEmpty().withMessage("First name is required"),
    check("lastname").notEmpty().withMessage("Last name is required"),
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};
export const loginValidationRules = () => {
  return [
    check("username").notEmpty().withMessage("username or email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};
