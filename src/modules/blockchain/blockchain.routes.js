import { Router } from "express";
import {
  getAgreement,
  getVehicleAgreementsList,
  getCustomerAgreementsList,
} from "./blockchain.controller.js";
import authenticate from "../../middleware/authenticate.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Blockchain
 *   description: On-chain rental agreements (read-only)
 */

/**
 * @swagger
 * /blockchain/agreement/{id}:
 *   get:
 *     summary: Get a single on-chain rental agreement
 *     tags: [Blockchain]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Agreement ID on the blockchain (starts at 1)
 *     responses:
 *       200:
 *         description: Agreement retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     agreement:
 *                       $ref: '#/components/schemas/BlockchainAgreement'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/agreement/:id", authenticate, getAgreement);

/**
 * @swagger
 * /blockchain/vehicle/{vehicleId}:
 *   get:
 *     summary: Get all on-chain agreements for a vehicle
 *     tags: [Blockchain]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB vehicle ID
 *     responses:
 *       200:
 *         description: List of agreements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     agreements:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/BlockchainAgreement'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/vehicle/:vehicleId", authenticate, getVehicleAgreementsList);

/**
 * @swagger
 * /blockchain/customer/{walletAddress}:
 *   get:
 *     summary: Get all on-chain agreements for a customer wallet
 *     tags: [Blockchain]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *           example: '0xE63B9427116EDCB23d36DCF643DFB91b79125e5a'
 *         description: Ethereum wallet address
 *     responses:
 *       200:
 *         description: List of agreements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     agreements:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/BlockchainAgreement'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/customer/:walletAddress", authenticate, getCustomerAgreementsList);

export default router;