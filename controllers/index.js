const { default: axios } = require("axios");
const res = require("express/lib/response");
const { syncIndexes } = require("mongoose");
// const { token } = require("morgan");
const heardifyDb = require("../Models/heardifyDb");
const playlistDb = require("../Models/playlistDb");

const clientId = "0a9829432e2c4df1acae5df180f278ae";
const clientSecret = "72342689cd1a40c186f08f5a307967c1";

let token = null;
let genresList = null;
let songList = null;
// Client_id=0a9829432e2c4df1acae5df180f278ae
// Client_secret=72342689cd1a40c186f08f5a307967c1

// private methods
async function _getToken(req, res, next) {
  let result = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: { username: clientId, password: clientSecret },
    data: "grant_type=client_credentials",
  })
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      token = res.data.access_token;
    });
  _getGenres();
  _getTracks();
  res.render("index.ejs", { genresList, songList });
}

async function _getGenres(req, res, next) {
  const genresResult = await axios({
    method: "get",
    url: "https://api.spotify.com/v1/browse/categories?locale=sv_US",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      // console.log("response");
      // console.log(res.data);
      //load
      let genresData = res.data.categories.items;
      const genres = genresData.map(function (genre) {
        return genre.name;
      });

      genresList = genres;
      // console.log(genresList);
    });
}

async function _getTracks(req, res, next) {
  const tracksEndPoint =
    "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M";
  const limit = 10;
  const getTracksResult = await axios({
    method: "get",
    url: `${tracksEndPoint}/tracks?limit=${limit}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      songList = res.data.items;
      // console.log(songList[0].track.album.images[2].url);

      // console.log("playlistDataStart_______");
      // res.data.items.forEach((item) => {
      //   console.log(item.track.name);
      //   console.log(item.track.artists[0].name);
      // });
    });
}

async function addToPlaylist(req, res, next) {
  // console.log(playlistDb);
  let addSongDetails = await playlistDb.create({
    trackName: req.body.trackName,
    artist: req.body.artist,
    albumCover: req.body.albumCover,
  });
  // console.log(addSongDetails);

  res.redirect("/");
}

async function showMyPlaylist(req, res, next) {
  let mySongs = await playlistDb.find();
  console.log(mySongs);
  res.render("myPlaylist.ejs", { mySongs });
}

async function deleteSong(req, res) {
  console.log("delete");
  console.log(req.body);
  await playlistDb.deleteOne(req.body.id);
  res.redirect("/myPlaylist");
}

async function editPlaylist(req, res) {
  let editPlaylist = await playlistDb.findById(req.params.id);
  res.render("editMyPlaylist.ejs", { editPlaylist });
}

async function updatePlaylist(req, res) {
  console.log(editPlaylist.id);
  // res.send("editPlaylist");
  await playlistDb.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.redirect("/myPlaylist");
}

module.exports = {
  _getToken,
  _getGenres,
  _getTracks,
  showMyPlaylist,
  addToPlaylist,
  deleteSong,
  editPlaylist,
  updatePlaylist,
};
