export default function (req) {
  if (req.route.path == '/discord') {
    req.redirect('https://discord.gg/rqEWDzSnuF');
  }
}