module.exports = {
  index(req, res, next){
    // when I change this to 'send' from 'end' Navbar.js does not register styling
    return res.end('Work it!! from the express server!')
  }
}