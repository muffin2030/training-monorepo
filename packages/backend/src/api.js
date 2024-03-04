const { validEmail, validPassword } = require("@tm/common/lib/consts");
const { resolveWithValue } = require("@tm/common/lib/utils/resolve-with-value");
const router = require("express").Router();

router.post(`/login`, async (req, res) => {
  const { email, password } = req.body;

  await resolveWithValue(true, 1500);

  if (email === validEmail && password === validPassword) {
    res.json({ token: "token", refreshToken: "refresh-token" });
  } else {
    res.status(400).send({ message: "login or password is incorrect" });
  }
});

router.post("/refresh-tokens", async (req, res) => {
  await resolveWithValue(true, 1500);

  res.json({ token: "new-token", refreshToken: "new-refresh-token" });
});

router.post("/logout", async (req, res) => {
  await resolveWithValue(true, 1500);

  res.json({ success: true });
});

module.exports = router;
