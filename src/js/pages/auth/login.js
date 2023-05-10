import Auth from '../../network/auth';
// import Config from '../../config/config';
// import Utils from '../../utils/utils';
// import CheckUserAuth from './check-user-auth';

const Login = {
  async init() {
    // CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginForm.classList.add('was-validated');
        await this._getLogged();
      },
      false,
    );
    // Tombol Guest User
    const guestUserButton = document.querySelector('#guestUserButton');
    guestUserButton.addEventListener('click', this._loginAsGuestUser.bind(this));
  },

  async _loginAsGuestUser() {
    try {
      // Melakukan login sebagai guest user (tanpa autentikasi)
      // dengan menggunakan username "guest" dan password "guest123"
      const response = await Auth.login({
        email: 'guest123@gmail.com',
        password: 'guest123',
      });

      // Menyimpan informasi pengguna guest user di localStorage atau sesuai kebutuhan
      localStorage.setItem('guestUser', JSON.stringify(response));

      // masuk ke halaman dashboard  setelah login
      window.location.href = '/'; // Sesuaikan dengan halaman dashboard yang kita miliki
    } catch (error) {
      console.error(error);
    }
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      try {
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });
        // Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.loginResult.token);
        window.alert('Signed user in detected');

        // this._goToDashboardPage();
      } catch (error) {
        console.error(error);
      }
    }
  },

  _getFormData() {
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Login;
