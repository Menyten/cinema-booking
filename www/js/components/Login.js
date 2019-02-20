class Login extends Component {
    constructor(props) {
    super(props);
    this.addRoute('/login', 'Logga in');
    
    this.addEvents({
      'click .submit-btn': 'login',

      'click .register-btn': 'register'
    })
    this.loggedIn = false;
  }
  static get baseRoute() {
    return 'login/';
  }
 
  async delete() {
    this._id = 1;
    await super.delete();

    // to go back to the start page after looged out
    Router.goto('/');
    
    // loads the web browser
    location.reload()

    
  }
 
  async register() {
    let user = new User({
      email: $('.email').val(),
      password: $('.password').val()
    });
    await user.save();
    $('.email').val('')
    $('.password').val('')
  }
 
  async login() {
    let login = new Login({
      email: $('.email').val(),
      password: $('.password').val()
    });
    let result = await login.save();
    console.log(result)
    if (result.error) {
      // replace with something smoother
      alert(result.error);
    }
    App.app.checkIfLoggedIn();
    this.loggedIn = true;

    // Router to go to My bookings page after the user has logged in 
    Router.goto('/mybookings');
  }
 }