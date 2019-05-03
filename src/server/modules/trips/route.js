import { Router } from 'express';
import SearchController, {
  CityLookupDataController,
} from '@modules/trips/controllers/SearchController';

const router = Router();

router.post('/search', SearchController);

router.get('/cities', CityLookupDataController);

export default router;
