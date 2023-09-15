const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const qs = require("qs");

module.exports = router;

router.get("/eos-login/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const url = "https://api.epicgames.dev/epic/oauth/v1/token";

    let data = qs.stringify({
      grant_type: "authorization_code",
      deployment_id: "3e897de545f54813a06f1aebc1c1af05",
      scope: "basic_profile friends_list presence country",
      code: code,
      redirect_uri: "https://dragonsofmidgard.com/eos-success",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.epicgames.dev/epic/oauth/v1/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic eHl6YTc4OTFob3lkM3RhQnI2WndyeWNEOGdFZVQ3RHc6WngxcVRlSFR4RjE5c1ZXeC9zRjViTUNSa1VVdnBBQ3p5Z1VlTWxZc1ZlMA==",
      },
      data: data,
    };

    let res_;
    await axios
      .request(config)
      .then((response) => {
        res_ = response.data;
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });

    res.send(res_);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
