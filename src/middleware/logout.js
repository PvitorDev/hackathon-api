const logout = async (req, res, next) => {
  try {
    res.redirect("/");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logout;
