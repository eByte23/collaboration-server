import { Request, Response, Router } from 'express';
import userController from '../controllers/userController';

let router = Router();

router.get("/ping", (req: Request, res: Response) => {
    res.send("pong");
})

router.use("/user", userController);


export default router;