import UserDTO from '../dtos/userDto.js';
import dotenv from 'dotenv';

dotenv.config();

export const createAdminSession = (req, res) => {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (req.body.username === ADMIN_USERNAME && req.body.password === ADMIN_PASSWORD) {
    req.session.user = {
      name: ADMIN_USERNAME,
      role: 'admin',
    };
    console.log("ADMIN");
    res.status(200).json({ status: 'success', message: 'ADMIN Iniciado' });
  } else {
    res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
  }
};

  export const register = (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.send({ status: "success", message: "Registrado", user: userDTO });
  };
  
  export const registerFail = (req, res) => {
    console.log(req.session.messages);
    res.status(400).send({ status: "error", error: req.session.messages });
  };
  
  export const githubCallback = (req, res) => {
    const userDTO = new UserDTO(req.user);
    req.session.user = userDTO;
    res.status(200).json({ status: "success", message: "Logueado en GitHub", user: userDTO });
    res.redirect('/profile');
  };
  
  export const login = (req, res) => {
    const userDTO = new UserDTO(req.user);
    req.session.user = userDTO;
    res.sendStatus(200);
  };
  
  export const loginFail = (req, res) => {
    console.log(req.session.messages);
    res.status(400).send({ status: "error", error: req.session.messages });
  };
  