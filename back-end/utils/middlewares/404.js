export const Error404 = (req, res, next)=>{ // Custom Middleware
    res.json({message: 'OOPS U Type Something else...'});
}