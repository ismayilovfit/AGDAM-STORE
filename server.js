const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// CORS ayarları
app.use(cors());

// JSON verisi ile çalışabilmek için
app.use(express.json());

// Statik dosyalar için
app.use(express.static('public'));

// MongoDB bağlantısı (bağlantı URL'si değiştirilebilir)
mongoose.connect('mongodb://localhost:27017/agdam_store', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB'ye bağlandı"))
    .catch((err) => console.log('MongoDB bağlantı hatası:', err));

// Socket.io ile chat sistemi
io.on('connection', (socket) => {
    console.log('Yeni bir kullanıcı bağlandı');
    
    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg);
    });
    
    socket.on('disconnect', () => {
        console.log('Kullanıcı bağlantıyı kesti');
    });
});

// Sunucu başlatma
server.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor');
});
