export function notFoundError(req,res,next){
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
};
/**
 * gestionnaire d'erreurs avec quatre parametres :
 * Le premier parametre est suppose etre une erreur transmise par
 * le "next" d'un autre middleware
 */
export function errorHandler(err, req, res, next){
    res.status(err.status || 500).json({
        message: err.message,
    });
};