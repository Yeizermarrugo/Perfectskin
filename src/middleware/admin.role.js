const User = require('../models/user.model')
const Role = require('../models/roles.model')

const roleAdminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    console.log(user);
    const roles = await Role.findAll({ id: { $in: user.role_id } });
    console.log(roles);
    for (let i = 0; i < roles.length; i++) {
      if (user.roleId === "6288423f-4596-41db-9d22-e93639025e61") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }

}


module.exports = roleAdminMiddleware