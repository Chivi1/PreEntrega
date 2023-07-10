import { Router } from "express";
import passport from "passport";
import {
  register,
  registerFail,
  githubCallback,
  login,
  loginFail,
  createAdminSession
} from "../controllers/sessionController.js";

const router = Router();

router.post("/register", passport.authenticate("register", { failureRedirect: "/api/sessions/registerFail" }), register);

router.get("/registerFail", registerFail);

router.get("/github", passport.authenticate("github"), () => {});

router.get("/githubcallback", passport.authenticate("github"), githubCallback);

router.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/loginFail" }), login);

router.post('/admin-login', createAdminSession);

router.get("/loginFail", loginFail);

export default router;
