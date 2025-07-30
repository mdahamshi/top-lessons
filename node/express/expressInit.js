// expressInit.js
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function initExpressApp(app) {
  // Locals
  app.locals.appName = 'Top Express';
  // nav links
  app.locals.links = [{ href: '/', text: 'Home' }];

  // Logger
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // Body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static files
  app.use(express.static(path.join(__dirname, 'public')));

  // View engine
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.set('layout', 'layout');
}
