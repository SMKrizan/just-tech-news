const router = require('express').Router();
const { Comment } = require('../../models');


router.get('/', (req, res) => {

});

router.post('/', (req, res) => {
    console.log('req.session: ', req.session);
    console.log('req.body: ', req.body);

    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', (req, res) => {

})

module.exports = router;
