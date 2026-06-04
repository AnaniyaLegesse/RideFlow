import {
  getAgreementFromChain,
  getVehicleAgreements,
  getCustomerAgreements,
} from "./blockchain.service.js";
import { successResponse } from "../../utils/apiResponse.js";

export const getAgreement = async (req, res, next) => {
  try {
    const agreement = await getAgreementFromChain(Number(req.params.id));
    return successResponse(res, 200, "Agreement retrieved", { agreement });
  } catch (error) {
    next(error);
  }
};

export const getVehicleAgreementsList = async (req, res, next) => {
  try {
    const agreements = await getVehicleAgreements(req.params.vehicleId);
    return successResponse(res, 200, "Vehicle agreements retrieved", { agreements });
  } catch (error) {
    next(error);
  }
};

export const getCustomerAgreementsList = async (req, res, next) => {
  try {
    const agreements = await getCustomerAgreements(req.params.walletAddress);
    return successResponse(res, 200, "Customer agreements retrieved", { agreements });
  } catch (error) {
    next(error);
  }
};