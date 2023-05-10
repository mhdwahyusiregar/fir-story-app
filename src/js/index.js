// Import our custom CSS
import '../scss/main.scss';

// Import components
import './components/index';

// Import javascript file as needed
import Dashboard from './pages/dashboard';
import Add from './pages/storys/add';
import GuestUser from './pages/storys/guest-user';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

import './utils/firebase';
import * as bootstrap from 'bootstrap';
import CheckUserAuth from './pages/auth/check-user-auth';

const routes = {
  '/': Dashboard,
  '/storys/add.html': Add,
  '/storys/guest-user.html': GuestUser,
  '/auth/login.html': Login,
  '/auth/register.html': Register,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${header.clientHeight + footer.clientHeight}px)`;
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  initPages();

  CheckUserAuth.checkLoginState(async () => {
    const route = detectRoute();
    await route.init();
  });
});