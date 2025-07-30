import { getAllUsers } from '../storages/index.js';

export function getHome(req, res) {
  res.render('pages/home', { title: 'Home' });
}
