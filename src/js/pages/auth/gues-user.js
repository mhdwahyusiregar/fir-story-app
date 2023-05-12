import Auth from '../../network/auth';
import Config from '../../config/config';
import Utils from '../../utils/utils';

const GuestButton = {
  init() {
    const guestButton = document.querySelector('#guestButton');
    guestButton.addEventListener('click', async () => {
      try {
        const response = await Auth.login({
          email: Config.GUEST_EMAIL,
          password: Config.GUEST_PASSWORD,
        });
        Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.loginResult.token);
        window.alert('Anda masuk sebagai guest user.');
        this._goToDashboardPage();
      } catch (error) {
        console.error(error);
      }
    });
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default GuestButton;
