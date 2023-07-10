import dotenv from 'dotenv';

dotenv.config();

export const createAdminSession = (req, res) => {
    const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
  
    if (req.body.username === ADMIN_USERNAME && req.body.password === ADMIN_PASSWORD) {
      req.session.user = {
        username: ADMIN_USERNAME,
        role: 'admin',
      };
      res.send({ status: 'success', message: 'ADMIN Iniciado' });
    } else {
      res.status(401).send({ status: 'error', error: 'Invalido' });
    }
  };

export const register = (req, res) => {
    res.send({ status: "success", message: "Registrado" });
  };
  
  export const registerFail = (req, res) => {
    console.log(req.session.messages);
    res.status(400).send({ status: "error", error: req.session.messages });
  };
  
  export const githubCallback = (req, res) => {
    const user = req.user;
    req.session.user = {
      id: user.id,
      name: user.first_name,
      role: user.role,
      email: user.email,
    };
    res.send({ status: "success", message: "Logueado en GitHub" });
  };
  
  export const login = (req, res) => {
    req.session.user = {
      name: req.user.name,
      role: req.user.role,
      id: req.user.id,
      email: req.user.email,
    };
    res.sendStatus(200);
  };
  
  export const loginFail = (req, res) => {
    console.log(req.session.messages);
    res.status(400).send({ status: "error", error: req.session.messages });
  };
  