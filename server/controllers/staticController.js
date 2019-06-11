module.exports = {
  index(req, res, next){
    console.log('{STATIC-CONTROLLER} REQ: ', req.session);
    if(req.user){
      console.log('{STATIC-CONTROLLER} REQ.USER: ', req.user);
      res.send('USER SIGNED IN');
    } else {
      console.log('{STATIC-CONTROLLER} ELSE NO USER: ', req.route);
      res.send('NO USER SIGNED IN')
    }
  },
}