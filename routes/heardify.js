var express = require("express");
const heardifyDb = require("../Models/heardifyDb");
const heardifyCtrl = require("../controllers/heardify.js");
var router = express.Router();

/* GET users listing. */
router.get("/", heardifyCtrl.homePage);

router.get("/playlist", heardifyCtrl.playlist);

router.post("/getPlaylist", heardifyCtrl.getPlaylist);

module.exports = router;
