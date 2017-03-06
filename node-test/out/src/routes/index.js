"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
let router = express_1.Router();
router.get("/ping", (req, res) => {
    res.send("pong");
});
router.use("/user", userController_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map