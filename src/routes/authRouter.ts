import express from 'express';

import { signUp, logIn, resetPassword } from '../controllers/authContoller';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/log-in', logIn);
authRouter.patch('/reset-password', resetPassword);

export default authRouter;
