const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require('./pagination.helper');

// CREATE USER
exports.create = (req, res) => {
  if(!req.body.email) {
    res.status(400).send({
      message: "Email cannot be empty!"
    });
    return;
  }

  const user = {
    full_name: req.body.full_name,
    email: req.body.email,
    is_active: req.body.is_active ? req.body.is_active : false
  };

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

// LIST USER
exports.list = (req, res) => {
  const { page, size, email } = req.query.email;
  var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  User.findAndCountAll(
    {
      where: condition, limit, offset
    }
  ).then(data => {
    console.log(data)
    const response = getPagingData(data, page, limit);
    res.send(response);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};

// GET USER
exports.get = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

// UPDATE USER
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// DELETE USER
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy(
    {
      where: { id: id }
    }
  ).then(num => {
    if (num == 1) {
      res.send({
        message: "User was deleted successfully!"
      })
    } else {
      res.send({
        message: "Cannot delete user with id= " + id
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
};
