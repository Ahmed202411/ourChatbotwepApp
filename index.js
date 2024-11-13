const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // استيراد مكتبة path

const app = express();
app.set("port", process.env.PORT || 8000); // إعداد المنفذ

// إعدادات body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// صفحة البداية
app.get("/", function (req, res) {
  res.send("Hey!! , I'm just a chatbot web App.");
});

// صفحة webhook
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "VERIFY_TOKEN12345";
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// تقديم ملفات HTML
app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'terms.html'));  // تأكد من أن الملف موجود في المجلد نفسه
});

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'privacy.html'));
});

// بدء الخادم
app.listen(app.get("port"), function () {
  console.log("Server is running and listening on port " + app.get("port"));
});
