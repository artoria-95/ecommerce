const isUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    throw new Error('Not logued in')
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new Error('Not Admin User')
  }
}

module.exports={
 isUser,
 isAdmin
}