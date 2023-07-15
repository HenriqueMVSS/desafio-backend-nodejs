import express from 'express';
import multer from 'multer';
import boletoController from '../controllers/BoletoController';

const upload = multer();
const router = express.Router();

router.post('/importar', upload.single('file'), boletoController.importarBoletos);
router.get('/', boletoController.obterBoletos);

export default router;
