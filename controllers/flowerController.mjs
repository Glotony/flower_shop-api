import { Flower } from '../models/index.mjs';

// GET all flowers
export const getAll = async (req, res) => {
  try {
    const flowers = await Flower.findAll();
    res.json(flowers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch flowers' });
  }
};

// GET one flower by id
export const getOne = async (req, res) => {
  try {
    const flower = await Flower.findByPk(req.params.id);
    if (!flower) return res.status(404).json({ message: 'Flower not found' });
    res.json(flower);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch flower' });
  }
};

// CREATE a new flower
export const create = async (req, res) => {
  try {
    const { name, description, price, image_url } = req.body;
    const flower = await Flower.create({ name, description, price, image_url });
    res.status(201).json(flower);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create flower' });
  }
};

// UPDATE flower
export const update = async (req, res) => {
  try {
    const flower = await Flower.findByPk(req.params.id);
    if (!flower) return res.status(404).json({ message: 'Flower not found' });

    const { name, description, price, image_url } = req.body;
    await flower.update({ name, description, price, image_url });
    res.json(flower);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update flower' });
  }
};

// DELETE flower
export const del = async (req, res) => {
  try {
    const flower = await Flower.findByPk(req.params.id);
    if (!flower) return res.status(404).json({ message: 'Flower not found' });

    await flower.destroy();
    res.json({ message: 'Flower deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete flower' });
  }
};
