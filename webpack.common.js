const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// konfigurasi html
const htmlWebpackPluginConfig = {
  meta: {
    viewport:
      'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
    'theme-color': '#4285f4',
  },
  templateParameters: {
    brandName: 'Story App',
    navLinks: `
      <ul class="navbar-nav ms-auto mb-2 mb-md-0 d-flex align-items-center gap-3">
        <li class="nav-item">
          <a class="nav-link" href="/">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/storys/add.html">Add Story</a>
        </li>
        <li class="nav-item dropdown d-none" id="userLoggedMenu">
          <a class="nav-link dropdown-toggle text-nowrap" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div style="width: 35px;height: 35px" class="me-2 d-inline-block">
              <img id="imgUserLogged" class="img-fluid rounded-pill" src="" alt="">
            </div>
            <span id="nameUserLogged"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" id="userLogOut" href="#">Log Out</a></li>
          </ul>
        </li>
        <li class="nav-item" id="loginMenu">
          <a class="nav-link" href="/auth/login.html">Login</a>
        </li>
      </ul>
    `,
    footerContent:
      '<p class="text-center text-white mb-0">Made with ❤ by Muhammad Wahyu Siregar</p>',
  },
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dashboard',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/views/dashboard.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Add Records',
      filename: 'storys/add.html',
      template: path.resolve(__dirname, 'src/views/storys/add.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Guest User',
      filename: 'storys/guest-user.html',
      template: path.resolve(__dirname, 'src/views/storys/guest-user.html'),
      ...htmlWebpackPluginConfig,
    }),

    // Auth pages
    new HtmlWebpackPlugin({
      title: 'Login',
      filename: 'auth/login.html',
      template: path.resolve(__dirname, 'src/views/auth/login.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Register',
      filename: 'auth/register.html',
      template: path.resolve(__dirname, 'src/views/auth/register.html'),
      ...htmlWebpackPluginConfig,
    }),

    new CleanWebpackPlugin(),
  ],
};
