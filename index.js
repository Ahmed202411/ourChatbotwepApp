const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // استيراد مكتبة path

// إنشاء تطبيق Express
const app = express();

// إعداد المنفذ الذي سيستمع عليه التطبيق
app.set("port", process.env.PORT || 8000); // استخدام المنفذ من المتغيرات البيئية أو المنفذ 8000 افتراضياً

// إعدادات body-parser لتحليل محتوى الطلبات
app.use(bodyParser.urlencoded({ extended: false })); // تحليل محتوى البيانات بشكل URL-encoded
app.use(bodyParser.json()); // تحليل محتوى البيانات بصيغة JSON

// إنشاء مسار GET عند الوصول إلى "/" وإرسال رسالة بسيطة
app.get("/", function (req, res) {
  res.send("Hey!! , I'm just a chatbot web App."); // إرسال رسالة نصية بسيطة كاستجابة للطلب
});

// إضافة دعم لطلبات GET إلى الـ webhook
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "VERIFY_TOKEN12345";

  // استخراج المعاملات من الاستعلام
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // التحقق من التوكن المرسل للتأكد من صحته
  if (token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    // إرسال "403 Forbidden" إذا لم تتطابق رموز التحقق
    res.sendStatus(403);
  }
});

app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'Terms.html'));  // يجب أن يكون اسم الملف كما هو في النظام
});

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'Privacy.html'));  // يجب أن يكون اسم الملف كما هو في النظام
});

// بدء تشغيل الخادم والاستماع على المنفذ المحدد
app.listen(app.get("port"), function () {
  console.log("Server is running and listening on port " + app.get("port"));
});
