
export const validateUser = async (req, res, next) => {
    try {
        let accessToken;
        let authHeaders = req.headers.authorization || req.headers.Authorization;
        if (authHeaders && authHeaders.startsWith("Bearer")) {
            accessToken = authHeaders.split(" ")[1];
            jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(401).json({message: "unauthorised access"});
                } else {
                    req.user = decoded.user;
                    console.log(req.user)
                    next();
                }   
            })
        } else {
            return res.status(401).json({message: "unauthorised access"});
        }
    } catch (error) {
        Logging.error(error)
        res.status(500).json({error: "an unexpected error occurred"})
    }
}