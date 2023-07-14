import UserDTO from '../dtos/userDto.js';

export const privacy = (privacyType) => {
  return (req, res, next) => {
    const userDTO = req.session.user ? new UserDTO(req.session.user) : null;
    switch (privacyType) {
      case "PRIVATE":
        if (userDTO) {
          next();
        } else {
          res.redirect('/login');
        }
        break;
      case "NO_AUTHENTICATED":
        if (!userDTO) {
          next();
        } else {
          res.redirect('/profile');
        }
        break;
      case "ADMIN":
        if (userDTO && userDTO.role === "admin") {
          next();
        } else {
          res.status(403).send('Access denied');
        }
        break;
      case "USER":
        if (userDTO && userDTO.role === "user") {
          next();
        } else {
          res.status(403).send('Access denied');
        }
        break;
      default:
        res.status(500).send('Invalid privacy type');
    }
  };
};
