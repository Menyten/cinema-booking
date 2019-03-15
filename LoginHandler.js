const bcrypt = require('bcrypt');

module.exports = class LoginHandler {

  constructor(app, User) {
    this.app = app;
    this.User = User;
    this.createLoginRoute();
    this.createCheckIfLoggedInRoute();
    this.createLogoutRoute();
  }

  createLoginRoute() {
    this.app.post('/json/logins', async (req, res) => {
      let data = req.body;
      let user = await this.User.findOne({ email: data.email });
      if (!user) {
        res.json({ error: 'No such user!' });
        return;
      }
      let match = await bcrypt.compare(data.password + passwordSalt, user.password);
      if (!match) {
        res.json({ error: 'The password does not match!' });
        return;
      }
      req.session.user = user;
      req.session.save();
      res.json({ loggedIn: true });
    });

  }

  createCheckIfLoggedInRoute() {
    this.app.get('/json/logins', (req, res) => {
      if (!req.session.user) {
        res.json({ error: 'Not logged in!' });
        return;
      }
      res.json({ email: req.session.user.email, _id: req.session.user._id, admin: req.session.user.admin });
    });
  }

  createLogoutRoute() {
    this.app.delete('/json/logins/*', (req, res) => {
      delete req.session.user;
      req.session.save();
      res.json({ loggedOut: true });
    });
  }
}