export default function logger(req, res, next) {
    console.log("My Custom Middleware. [logger]");
    next();
};
