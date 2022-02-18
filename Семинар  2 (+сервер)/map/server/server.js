// node -v
// npm install express --save
let express = require('express');
let app = express();

app.get('/', function (req, res){
    res.sendFile('C:/Users/simon/Documents/GitHub/FA-University/FA/3 КУРС/2 СЕМЕСТР/WEB/sem-2/map/map.html')
});

app.listen(8089);

// добавить параметр - режим маршрута (пешком, на машине)