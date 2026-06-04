import { Router } from "express";
import {
  getAgreement,
  getVehicleAgreementsList,
  getCustomerAgreementsList,
} from "./blockchain.controller.js";
import authenticate from "../../middleware/authenticate.js";

const router = Router();

router.get("/agreement/:id", authenticate, getAgreement);
router.get("/vehicle/:vehicleId", authenticate, getVehicleAgreementsList);
router.get("/customer/:walletAddress", authenticate, getCustomerAgreementsList);

export default router;