import express from "express";
import { home, scrape } from '../controllers/media'

const media = express.Router();

media.get('/', home);
media.post('/scrape', scrape);

export default media