import { Router } from 'express';
import SearchController from '@modules/trips/controllers/SearchController';

const router = Router();

router.post('/search', SearchController);

export default router;
