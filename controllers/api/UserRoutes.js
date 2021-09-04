const router = require('express').Router();
const {User} = require('../../models');

  //Logout post dataTypes
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
    req.session.destroy(() => {
         res.status(204).end();
       });
     } else {
       res.status(404).end();
     }
   });

//Signup post data
router.post('/signup', async (req, res) => {
    try{
        const currLogin = await User.create(req.body);
        console.log(req.body);
        req.session.save(() => {
        req.session.user_id = currLogin.id;
        req.session.loggedIn = true;
        res.json(currLogin);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err); 
    }
})

//Login post data
router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
      const userData = await User.findOne({ where: { username: req.body.username }, });
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
      const passwordInput = await userData.checkPassword(req.body.password);
      console.log('Valid password', passwordInput);
  
      if (!passwordInput) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
        
        res.json({ user: userData, message: 'Login successful' });
      });
  
    } catch (err) {
        console.log(err);
      res.status(400).json(err);
    }
  });
  

module.exports = router;