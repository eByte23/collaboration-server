import * as uuid from 'uuid/v4';
import { Request, Response, Router} from 'express';

let router = Router()

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.all("/create", (req: Request, res: Response) => {
    let requestBody = (req.body|| {}) as CreateUser;
    let username = requestBody.username || null;

    if (username == null) {
        res.status(400).json({
            errors: [{
                username: "should not be null or empty"
            }]
        })
        return;
    }

    let user: User = {
        username: username,
        userId: uuid()
    };

    res.status(200).json(user);
});

export default router;

interface CreateUser {
    username: string;
}

export interface User {
    username: string;
    userId: string
}