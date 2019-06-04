module.exports = {
  index(req, res, next){
    console.log('{WORKOUT CONTROLLER}: ', req);
    return res.end('Work it!! from the express server!')
  }
}