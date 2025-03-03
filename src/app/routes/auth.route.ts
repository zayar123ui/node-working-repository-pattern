import { Router } from "express";

import {
  googleFailure,
  googleLogin,
  googleSuccess,
  phoneNumberLogin,
  whoAmI,
} from "../controllers/auth.controller";

const router = Router();

router.get("/who-am-i", whoAmI);

router.get("/google", googleLogin);
router.get("/google/success", googleSuccess);
router.get("/google/failure", googleFailure);

router.get("/phone-number", phoneNumberLogin);
// router.get("/phone-number/success", phoneNumberSuccess);
// router.get("/phone-number/failure", phoneNumberFailure);


export default router;
