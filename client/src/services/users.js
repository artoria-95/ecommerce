import axios from 'axios';

//-----CAMBIO DE ROLES-----

export async function makeAdmin(id) {
  return axios
    .post(`http://localhost:5000/auth/promote/${id}`)
    .then(res => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

// server.post('/promote/:id', isAdmin, async function (req, res, next) {
//   const { id } = req.params;
//   try {
//     const result = await User.findByPk(id)
//     result.update({
//       isAdmin: true
//     }); res.send('User role changed to Admin')
//   } catch (error) {
//     next(error);
//   }
// });

export async function makeRegular(id){
  return axios
  .post(`http://localhost:5000/auth/degrade/${id}`)
  .then(res => {
    return res.data;
  })
  .catch((error) => {
    return error;
  })
};

// server.post('/degrade/:id', isAdmin, async function (req, res, next) {
//   const { id } = req.params;
//   try {
//     const result = await User.findByPk(id);
//     if (result) {
//       result.update({
//         isAdmin: false
//       }); res.send('User role is no longer admin');
//     }
//   } catch (error) {
//     next(error);
//   }
// });


//-----FUERZA CAMBIO DE CONTRASEÑA-----

export async function forcePwChange(id) {
  return axios
    .post(`http://localhost:5000/users/${id}/passwordReset`)
    .then(res => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

// server.post('/:id/passwordReset', isUser, async (req, res, next) => {
//   const { id } = req.params;
//   const newPassword = req.body.password;
//   try {
//     const result = await User.findByPk(id);
//     result.update({
//       password: newPassword,
//     }); res.send('Password Updated');
//   } catch (error) {
//     next(error);
//   }
// });

//-----BANNEA USUARIO-----

export async function banUser(id) {
  return axios
    .put(`http://localhost:5000/users/${id}/ban`)
    .then(res => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

// server.put('/:id/ban', isAdmin, async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const ban = await User.findByPk(id);
//     ban.update({
//      isBanned: true,
//     }); res.send('User Banned');
//   } catch (error) {
//     next(error);
//   }
// });

//-----ELIMINA USUARIO-----

export async function deleteUser(id) {
  return axios
    .delete(`http://localhost:5000/users/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(next);
};

// server.delete('/:id', isAdmin, (req, res, next) => {
//   const { id } = req.params;
//   User.destroy({
//     where: { id }
//   })
//     .then(() => {
//       return res.send({ UserDeleted: `id: ${Number(id)}` });

//     })
//     .catch(next);
// });
