/**
 * GET /
 * respond to requests for pages.
 */
exports.index = function(req, res) {
  res.render('home', {
      title: 'Home',
      person : 'hello!',
      posts :  [{
        'title' : 'Awesome Dog thing!',
        'interestname' : 'dogs' ,
        'username': 'davidawad'
      }, {
        'title' : 'pussy money weed',
        'interestname' : 'dogs' ,
        'username': 'davidawad'
      }, {
        'title' : 'Awesome Dog thing!' ,
        'interestname' : 'dogs' ,
        'username': 'davidawad'
      }]
    }
  );
};

exports.render_user = function(req, res) {
  uName = req.query.username ;
  //console.log(uName);
  // query username and get an array of objects
  res.render('user_account', {
      'title': 'postTitleHere',
      'username' : 'david', // or propagate uName and leave that here
      'isModerator' : true ,
      
      'following' : [
        'dogs',
        'cats' ,
        'cheese',
      ], 

      'other_interests' : [
        'Movies' ,
        'School'
      ],
      
      // array of posts from combined feed. 
      'news' : [{
        'article_Title' : 'article1' ,
        'author'  : 'vivekseth'
      }, {
        'article_Title' : 'article2' ,
        'author'  : 'MihirShah'
      }, {
        'article_Title' : 'article3' ,
        'author'  : 'davidawad'
      }],
    }
  );
}

/*  render any given post based on postID */
exports.render_post = function(req, res) {
  postid = req.query.postid ;

  res.render('post' ,

    {
      title : 'postTitleHere',

      username : 'username',

      isCurator: true,

      post_title: 'postTitleHere',

      post_content :'this is a thing aiasjdfpiuansepifjnalsdhbflajhsdfljahbs ldjhfb lasjhdf lajhsd ljhaf lsjhdf ,HSDkafunsljkdnfpaidshfpausndofiuaseoifjoiu',

      // array of comments
      comments : [

        {
          user : 'davidawad',
          comment : 'david\'s comment'
        },

        {
          user : 'vivekseth',
          comment : 'mihir\'s comment'
        },

      ],

    }
  );

};

/* render the interests page that contains all of the 'subreddits' */

exports.render_interests = function(req, res) {

  res.render('interests'  ,

    { // list of objects because jade.
      title: 'Interests',

      interests : [
        // array of interests
        {
          'interestname' : 'trees',
          'description' : 'a place for weed',
        },

        {
          'interestname' : 'space',
          'description' : 'for the earthbound',
        },

      ]

    }

  );

};

exports.new_post = function(req,res){
  res.render('postForm',
    {

      title: 'new post! :D' ,

      interest : 'Dogs'

    }
  )
};


exports.render_interest = function(req,res){
  interstid = req.query.interest ;
  console.log('grabbing all posts from interest:' + interstid );

  res.render('interestPage',
    {
      title : 'Dogs',

      posts :  [
        // array of posts for dogs
        {
          'title' : 'Awesome Dog thing!',
          'postid' : '1',
          'interestname' : 'dogs',
          'username': 'davidawad'
        } ,

        {
          'title' : 'pussy money weed',
          'postid' : '2',
          'interestname' : 'dogs' ,
          'username': 'davidawad'
        } ,

        {
          'title' : 'Awesome Dog thing!' ,
          'postid' : '3',
          'interestname' : 'dogs' ,
          'username': 'davidawad'
        } ,

      ]

    }
  )

};
