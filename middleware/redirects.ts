export default function (req) {
  if (req.route.path == '/login') {
    if (!req.$auth.loggedIn) {
      req.redirect(req.from.path);
      req.$auth.loginWith('auth0');
    }
    else
      req.redirect('/');
  } else if (req.route.path == '/logout') {
    if (req.$auth.loggedIn) {
      req.redirect(req.from.path);
      req.$auth.logout();
    }
    else
      req.redirect('/notauthenticated');
  } else if (!req.$auth.loggedIn && req.route.path != '/notauthenticated') {
    req.redirect('/notauthenticated');
  } else if (req.route.path.split('/')[1] == 'admin' && req.store.getters['userModule/scope'] != 'admin') {
    req.redirect('/');
  } else if (req.route.path.split('/')[1] == 'monitor' && req.store.getters['userModule/scope'] == 'none') {
    req.redirect('/');
  }
}