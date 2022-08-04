
const {Posts} = require('../../models')
const {Comment} = require('../../models')
const router = require('express').Router();
const withAuth = require('../../middleware/auth');
const isLoggedIn = require('../../middleware/loggedIn');

router.get('/post', async (req,res) => {
    try {
        const dbTimelineData = await Posts.findAll({
            where: {
                posted_by: req.body.posted_by,
                post_content: req.body.post_content
            }
        });

        const posts = dbTimelineData.map((result) =>
        result.get({ plain: true })
    );

        console.log(posts)
    } catch {

    }
})




module.exports = router;