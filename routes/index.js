var express = require("express");
var router = express.Router();
const indexCtrl = require("../controllers/index");

/* GET home page. */

router.post("/addToPlaylist", indexCtrl.addToPlaylist);

router.get("/myPlaylist", indexCtrl.showMyPlaylist);

router.get("/", indexCtrl._getToken);

router.get("/:id", indexCtrl.editPlaylist);

router.put("/update/:id", indexCtrl.updatePlaylist);

router.delete("/:id", indexCtrl.deleteSong);

module.exports = router;
