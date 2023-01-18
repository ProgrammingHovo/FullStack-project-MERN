import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import handleValidationErrors from "./utils/handleValidationErrors.js";

import checkAuth from "./utils/checkAuth.js";
import {
  userGetMe,
  userLogin,
  userRegister,
} from "./controllers/userController.js";

import {
  tagsGetAll,
  postsCreate,
  postsGetAll,
  postsGetOne,
  postsDeleteOne,
  postsUpdateOne,
} from "./controllers/postController.js";

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.nha6vpv.mongodb.net/blog?retryWrites=true&w=majority"
  )

  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));
const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, "uploads");
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/auth/login", loginValidation, handleValidationErrors, userLogin);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  userRegister
);
app.get("/auth/me", checkAuth, userGetMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", postsGetAll);
app.get("/tags", tagsGetAll);

app.get("/posts/:id", postsGetOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postsCreate
);
app.delete("/posts/:id", checkAuth, postsDeleteOne);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postsUpdateOne
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK!");
});
