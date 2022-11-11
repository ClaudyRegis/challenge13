const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll().then((tagData) => {
    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const data = await Tag.findByPk(id, { include: Product });
    res.status(200).json(data);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(
    res.status(200).json({message: "Tag Created!"})
  ).catch(err => {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where:{
      id: req.params.id
    }})
    .then(
      res.status(200).json({message: "Update Successful!"})
    ).catch(err => {
      res.status(500).json(err)
    })
  });

router.delete('/:id', (req, res) => {
  try {
    const TagtoDelete = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!TagtoDelete) {
      res.status(404).json({ message: 'No tag found!' });
      return;
    }

    res.status(200).json(TagtoDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
