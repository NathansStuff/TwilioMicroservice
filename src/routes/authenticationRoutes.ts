import express from 'express';
import {
    requestEmailHandler,
    requestSMSHandler,
    sendSMSHandler,
    verifyEmailHandler,
    verifySMSHandler,
} from '../controllers/authenticationController';

import { protect } from '../middleware/authMiddleware';

const authenticationRoutes = express.Router();

authenticationRoutes.post('/requestSMS', protect, requestSMSHandler);

authenticationRoutes.post('/verifySMS', protect, verifySMSHandler);

authenticationRoutes.post('/requestMessage', protect, sendSMSHandler);

authenticationRoutes.post('/requestEmail', protect, requestEmailHandler);

authenticationRoutes.post('/verifyEmail', protect, verifyEmailHandler);

export default authenticationRoutes;
