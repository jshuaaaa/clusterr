const {Posts, Friends, UserGroups, Users} = require('../models');
const {Comment} = require('../models');
const { Groups } = require('../models/index');
const router = require('express').Router();
const withAuth = require('../middleware/auth');
const isLoggedIn = require('../middleware/loggedIn');


router.get('/', isLoggedIn, async (req, res) => {
    try {
        res.status(200).render('landingpage');   
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', isLoggedIn, async (req,res) => {
    try {
        res.status(200).render('login');
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/signup', isLoggedIn, async (req,res) => {
    try {
        res.status(200).render('signup')   
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/home',withAuth,  async (req,res) => {
    try {
        const user = req.session.user_id
        console.log(req.session.address)
        const dbTimelineData = await Posts.findAll({
          where: {
            for_group: null
          }
        });
        const dbUserGroupData = await UserGroups.findAll({
          where: {
            user: req.session.user_id
          }
        });
        
        
        const dbFriendsData = await Friends.findAll({
            where: {
                user: req.session.user_id
            },
            attributes: {
                exclude: ['id', 'user']
            }
        });

        const friends = dbFriendsData.map(friend => friend.get({ plain: true }));
        console.log(friends);
        const array = dbTimelineData.map((result) =>
        result.get({ plain: true })
        );
        const groups = dbUserGroupData.map(group => group.get({ plain: true }));

        const posts = []
        for(let i = 0; i < 10; i++) {
          let post =  array[Math.floor(Math.random() * array.length)];
          if (!posts.includes(post)) {
            posts.push(post);
          }
        }
        res.render('home', 
          {posts, groups, friends, user},
        );
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }

    });

    router.get('/home/:groupname', withAuth, async (req, res) => {
      try {
        const user = req.session.user_id
        console.log(req.params.groupname)
        const dbTimelineData = await Posts.findAll({
          where: {
            for_group: null
          }
        });
        const dbGroupData = await Groups.findAll();

        const dbFriendsData = await Friends.findAll({
          where: {
              user: req.session.user_id
          },
          attributes: {
              exclude: ['id', 'user']
          }
      });

      const friends = dbFriendsData.map(friend => friend.get({ plain: true }));

        const array = dbTimelineData.map((result) =>
        result.get({ plain: true })
        );
        const groups = dbGroupData.map(group => group.get({ plain: true }));

        const posts = []
        for(let i =0; i<10; i++) {
           let post =  array[Math.floor(Math.random() * array.length)]
            posts.push(post)
        }
        
        const newGroup = await Groups.findAll({
          where: {
            group_name: req.params.groupname
          }
        });
        const searchGroups = newGroup.map(group => group.get({ plain: true }));
        
        res.render('home',{posts, searchGroups, friends, user})
      } catch (err) {
        res.status(400).json({ message: 'Group name must be unique' });
      }
    });




router.get('/post/:id', async (req,res) => {
  try {
      const dbTimelineData = await Posts.findOne({
        raw: true,
        where: {
          id: req.params.id
        }
      });
      console.log(dbTimelineData)

      if(dbTimelineData.for_group != null) {
          const groupFinder = await UserGroups.findAll({
            raw: true,
            where: {
              group_name: dbTimelineData.for_group,
              user: req.session.user_id
            }
          })

          if(groupFinder.length === 0) {
            res.redirect('/home')
          }
        }

      const dbCommentData = await Comment.findAll({
      where: {
          on_post: req.params.id
        },
  });

  const   comments = dbCommentData.map((result) =>
  result.get({ plain: true })
);

      const { posted_by, post_content } = dbTimelineData
      req.session.save(()=> {
          req.session.post_id = req.params.id
      })

      res.render('post',{posted_by, post_content,comments} );
    
  } catch (err) {
      console.log(err)
      res.status(400).json(err);
  }

})

router.get('/user/:username', async (req,res) => {
  try {
    const username = req.params.username
    let current = true;
    const dbUserData = await Users.findOne({ where: { username: username } });
    const dbPostData = await Posts.findAll({
      where: {
        posted_by: req.params.username
      }
    });

    if (dbUserData) {
      if ((req.session.user_id === username)) {
        current = false;
      }
      
      const posts = dbPostData.map((result) =>
        result.get({ plain: true })
      );
    
      res.status(200).render('user', 
      {posts, username, current},
      );

      return;
    }

    res.status(404).json({ message: 'Could not find user' });
  } catch (err) {
    res.status(500).json(err);
  }
})


  router.get('/groups/:username', async (req,res) => {
    const groupId = req.params.username
    const checkUser = await UserGroups.findAll({
      where: {
        user: req.session.user_id,
        group_name: req.params.username
      }
    });
    if(checkUser.length > 0) {
    const dbUserData = await Posts.findAll({
      where: {
        for_group: req.params.username
      }
    });

  
    const posts = dbUserData.map((result) =>
    result.get({ plain: true })
  );
    
    res.render('grouppage', 
    {posts, groupId},
    );
  } else {
    res.redirect('/home')
  }

  })



  router.get('/home/groups/:id', async (req,res) => {
    let groupId = req.params.id
    groupId = groupId.replace('g', '')
    

    const findUserGroup = await UserGroups.findAll({
      raw: true,
      where: {
        id: parseInt(groupId)
      }
    })
    if(findUserGroup) {

    const findGroup = await Groups.findAll({
      raw: true,
      where: {
        group_name: findUserGroup[0].group_name
      }
    })
    
    
    const { group_name } = findGroup[0]
    if(findGroup) {
    const dbUserData = await Posts.findAll({
      where: {
        for_group: group_name
      }
    });
    const findUsers = await UserGroups.findAll({
      where: {
        group_name: findUserGroup[0].group_name
      }
    })
    const posts = dbUserData.map((result) =>
    result.get({ plain: true })
    
  );

  const members = findUsers.map((result) =>
  result.get({ plain: true })
  
);
  
  console.log(group_name)
  res.render('grouppage', 
  {posts, members},
  ); 
  }
  } else {
    res.redirect('/home')
  }
  })


module.exports = router;