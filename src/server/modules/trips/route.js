import { Router } from 'express';
import SearchController from '@modules/trips/controllers/SearchController';
import { CityLookup } from '@modules/trips/controllers/LookupController';

const router = Router();

router.post('/search', SearchController);

router.get('/cities', CityLookup);

export default router;
