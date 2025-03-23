const requestLogger = (req, res, next) => {
    const start = Date.now();
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    });
  
    res.on('error', (err) => {
      console.error(`[${new Date().toISOString()}] ERROR ${req.method} ${req.url} - ${err.message}`);
    });
  
    next();
  };
  
  module.exports = requestLogger;
  