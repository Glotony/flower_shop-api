import { Flower } from '../models/index.mjs';

export const getAll = async (req,res) => res.json(await Flower.findAll());
export const getOne = async (req,res) => {
    const flower = await Flower.findByPk(req.params.id);
    if(!flower) return res.status(404).json({ message:'Not found' });
    res.json(flower);
};
export const create = async (req,res) => res.json(await Flower.create(req.body));
export const update = async (req,res) => {
    const flower = await Flower.findByPk(req.params.id);
    if(!flower) return res.status(404).json({ message:'Not found' });
    await flower.update(req.body);
    res.json(flower);
};
export const del = async (req,res) => {
    const flower = await Flower.findByPk(req.params.id);
    if(!flower) return res.status(404).json({ message:'Not found' });
    await flower.destroy();
    res.json({ message:'Deleted' });
};
