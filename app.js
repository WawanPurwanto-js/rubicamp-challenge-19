//**1 halaman */
// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


//**2 halaman */
// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => res.send('Hello Express!'))
// app.get('/about', (req, res) => res.send('ini halaman about'))
// app.listen(`${port}`, () => console.log(`Hello World app berjalan di http://localhost:${port}`))





//?json-bread
//?challlenge #19
//?di tantangan kali ini, kita akan mencoba membuat BREAD(browse,read,edit,add,delete) menggunakan express,json
//?dan menggunakan HTML dan CSS untuk mempercantik tampilan anda

const express = require('express'); //?setting expres
const path = require('path'); //
const app = express(); //?setting expres
const port = 3000 //?setting port localhost



let fs = require('fs');
const readData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const writeData = (readData) => fs.writeFileSync('./data.json', JSON.stringify(readData, null, 8), 'utf8');

var bodyParser = require('body-parser') //?setting bodyparser

app.use(bodyParser.urlencoded({
    extended: false
}))

// //? jsonParse aplikasi atau express API
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        json: readData
    })
});
app.get('/add', function (req, res) {
    res.render('add')
})

app.post('/add', (req, res) => {
    readData.push({
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    });
    writeData(readData);
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    let id = req.params.id
    readData.splice(id, 1);
    writeData(readData);
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    res.render('edit', {
        item: {
            ...readData[id]
        },
        id
    });
});

app.post('/edit/:id', (req, res) => {
    let id = req.params.id;
    const newValue = {
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean,
    };
    readData.splice(id, 1, newValue)
    writeData(readData);
    res.redirect('/')
});


app.listen(`${port}`, () => console.log(`Hello World app berjalan di http://localhost:${port}`))

// app.listen(3000, () => {
//     console.log("website berjalan di localhost: 3000")
// })