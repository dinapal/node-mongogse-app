const router = require('express').Router();
const {indexPage, registerView, registerUser, viewUsers,editUser, successCreated, updateUser, deleteUser } = require('../controllers/PagesController');


router.get('/', indexPage );
router.get('/home', indexPage );
router.get('/success/:id?', successCreated );
router.get('/register', registerView);
router.get('/users', viewUsers);
router.get('/user/:id?', editUser)
// Post Routes
router.post('/register', registerUser);
router.post('/update-user', updateUser);
router.get('/delete/:id?', deleteUser);


module.exports = router;

