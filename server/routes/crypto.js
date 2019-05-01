import express from "express";
import crypto from "../controllers/cryptoController"

const router = express.Router();


router.get("/getCrypto", crypto.getAllCryptoData)
router.get("/getSingleCurrency/:currency", crypto.getSingleCryptoData)

export default router