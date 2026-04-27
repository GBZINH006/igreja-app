const authorizeRole = (...rolesPermitidos) => {
  return (req, res, next) => {
    
    const admin = req.admin;

    if (!admin || !admin.role) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado"
      });
    }

    
    if (!rolesPermitidos.includes(admin.role)) {
      return res.status(403).json({
        success: false,
        message: "Permissão insuficiente para esta ação"
      });
    }

   
    next();
  };
};

module.exports = authorizeRole;