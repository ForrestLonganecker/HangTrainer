module.exports = {
  index(req, res){
    res.send(req.user);
  },
};