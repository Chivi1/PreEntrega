import UserDTO from '../dtos/userDto.js';
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
    res.send({ status: "success", message: "Logueado en GitHub", user: userDTO });
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
  