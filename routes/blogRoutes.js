const express = require('express');
const blogController = require('../controllers/blogController');
const Blog = require('../models/blog');

const router = express.Router();

// blog routes
router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);

router.get('/create', blogController.blog_create_get);


router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((response) => {
      res.render('edit', {title:"Edit Blog", blog:response})
    })
  
})



router.put('/edit/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body, {useFindAndModify: true})
    .then((response) => {
      // res.send(response)
      // res.render('index', {blogs: response, title: 'All blogs'})
      res.redirect('/blogs')
    })
})

router.get('/:id', blogController.blog_details)

router.delete('/:id', blogController.blog_delete)

module.exports = router;