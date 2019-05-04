import { Router } from 'express';
import SearchController from '@modules/trips/controllers/SearchController';
import * as LookupController from '@modules/trips/controllers/LookupController';

const router = Router();

router.post('/search', SearchController);

router.get('/cities', LookupController.CityLookup);

export default router;
