"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerGlobal = loggerGlobal;
function loggerGlobal(req, res, next) {
    const now = new Date();
    const localDateTime = now.toLocaleString();
    console.log(`Ejecutando ${req.method} ${req.url}, ${localDateTime}`);
    next();
}
//# sourceMappingURL=logger.middleware.js.map