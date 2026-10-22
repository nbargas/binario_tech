const loggerMiddleware = (req, res, next) => {
  const inicio = new Date().toISOString();
  res.on('finish', () => {
    console.log(`[LOG] ${req.method} ${req.originalUrl} - ${inicio}`);
  });
  next();
};

module.exports = loggerMiddleware;
