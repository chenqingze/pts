// server.js
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const userDb = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'UTF-8'))

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.resolve(__dirname, '..'), 'public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({storage});


server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());
// server.use(upload.any());
const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({username, password}) {
  return userDb.users.findIndex(user => user.username === username && user.password === password) !== -1
}

// Register New User
server.post('/register', (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const {username, password} = req.body;

  if (isAuthenticated({username, password}) === true) {
    const status = 401;
    const message = '用户名和密码已存在!';
    res.status(status).json({status, message});
    return
  }

  fs.readFile("./users.json", (err, result) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    // Get current users data
    let data = JSON.parse(result.toString());

    // Get the id of last user
    let last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({id: last_item_id + 1, username: username, password: password}); //add some data
    let writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      }
    });
  });
// Create token for new user
  const access_token = createToken({username, password})
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token})
});


// Login to one of the users from ./users.json
server.post('/login', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const {username, password} = req.body;
  if (isAuthenticated({username, password}) === false) {
    const status = 401
    const message = '错误的用户名或密码！'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({username, password})
  console.log("Access Token:" + access_token);
  res.status(200).json({username: username, token: access_token})
});


/*server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token not provided'
      res.status(status).json({status, message})
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
})*/

server.use((req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token not provided'
      res.status(status).json({status, message})
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
});


server.post('/uploads', upload.single('product-pic'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  res.status(200).json({filename: req.file.filename});
});


server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running')
});

