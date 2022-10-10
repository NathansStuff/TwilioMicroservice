import express from 'express';
import {
    requestSMSHandler,
    verifySMSHandler,
} from '../controllers/authenticationController';

import { protect } from '../middleware/authMiddleware';

const authenticationRoutes = express.Router();

authenticationRoutes.post('/requestSMS', protect, requestSMSHandler);

authenticationRoutes.post('/verifySMS', protect, verifySMSHandler);

export default authenticationRoutes;
