const member = require('./funcation/member');

module.exports = router => {
  router.get('/', (req, res) => res.end('Welcome to Learn2Crack !'));
 
 
 
 router.post('/members', (req, res) => {
       var url = req.body.url;
       console.log(url);
        if (!url || !url.trim() ) {
            res.status(400).json({ message: 'Invalid Request !' });
        } else {
            member.memberUser(url)
                .then(result => {
                    res.status(200).json({ message: result.message });
                })
                .catch(err => res.status(500).json({ message: err.message }));
        }



  });

}