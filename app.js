const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const open = require('open');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();
const port = 9999;
const nav = [{ link: '/books', title: 'Book' }, { link: '/authors', title: 'Author' }];

const booksRoute = require('./src/bookRouts/bookRouts')(nav);
const adminRoute = require('./src/bookRouts/adminRouts')(nav);
const authRoute = require('./src/bookRouts/authRouts')(nav);

// const config = {
//   user: 'library',
//   password: 'psL1brary',
//   server: 'pslibrary.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
//   database: 'PSLibrary',

//   options: {
//     // TrustServerCertificate: true,
//     // MultipleActiveResultSets: false,
//     encrypt: true // Use this if you're on Windows Azure
//   }
// };

// sql.connect(config).then(() => {
//   console.log('connected');
// }).catch((error) => {
//   console.log(error);
// });

app.use(morgan('tiny'));

app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport.js')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', booksRoute);
app.use('/admin', adminRoute);
app.use('/auth', authRoute);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav,
      title: 'Library'
    }
  );
});

app.listen(port, () => {
  console.log('listening');
  debug('debug listening');
  open(`http://localhost:${port}`);
});
