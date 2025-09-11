const path = require("path");
const TOKEN = process.env.ACCESS_TOKEN;

module.exports = (req, res, next) => {
    const token = req.query.token || req.headers['x-access-token'];
    if (token === TOKEN) next();
    else res.status(403).sendFile(path.join(__dirname, "../public/negado.html"));
};
