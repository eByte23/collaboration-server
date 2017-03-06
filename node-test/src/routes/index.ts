import * as express from 'express';
//import testContoller from '../controllers/testController';
let router = express.Router()

// middleware specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.all("/new-user", (req,res)=>{
    res.send("stuff")
});

export default router;