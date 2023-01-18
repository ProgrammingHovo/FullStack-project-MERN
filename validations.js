import { body } from "express-validator";

export const registerValidation = [
  body("email", "Incorrect form of email").isEmail(),
  body("password", "The password must be longer than 5 symbols").isLength({
    min: 5,
  }),
  body("fullName", "Please write name").isLength({ min: 3 }),
  body("avatarUrl", "The link of the avatar is not correct").optional().isURL(),
];

export const loginValidation = [
  body("email", "Incorrect form of email").isEmail(),
  body("password", "The password must be longer than 5 symbols").isLength({
    min: 5,
  }),
];

export const postCreateValidation = [
  body("title", "Write a title for article").isLength({ min: 3 }).isString(),
  body("text", "Write a text for article").isLength({
    min: 3,
  }),
  body("tags", "Incorrect format of tags").optional().isString(),
  body("imageUrl", "Incorrect link").optional().isString(),
];
