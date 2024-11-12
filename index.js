// استيراد المكتبات المطلوبة
const express = require('express');      // مكتبة Express لبناء تطبيقات الويب بسهولة
const bodyParser = require('body-parser'); // مكتبة body-parser لتحليل محتوى الطلبات
const request = require('request');       // مكتبة request لإرسال طلبات HTTP

// إنشاء تطبيق Express
const app = express();

// إعداد المنفذ الذي سيستمع عليه التطبيق
app.set("port", (process.env.PORT || 8000)); // استخدام المنفذ من المتغيرات البيئية أو المنفذ 8000 افتراضياً

// إعدادات body-parser لتحليل محتوى الطلبات
app.use(bodyParser.urlencoded({ extended: false })); // تحليل محتوى البيانات بشكل URL-encoded
app.use(bodyParser.json()); // تحليل محتوى البيانات بصيغة JSON

// إنشاء مسار GET عند الوصول إلى "/" وإرسال رسالة بسيطة
app.get("/", function(req, res){
    res.send("Hey!! , I'm just a chatbot web App."); // إرسال رسالة نصية بسيطة كاستجابة للطلب
});

// بدء تشغيل الخادم والاستماع على المنفذ المحدد
app.listen(app.get("port"), function(){
    console.log("Server is running and listening on port " + app.get("port"));
    // طباعة رسالة في وحدة التحكم توضح أن الخادم يعمل على المنفذ المحدد
});
