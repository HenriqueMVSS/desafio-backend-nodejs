import express from 'express';
import multer from 'multer';
import pdfController from '../controllers/PDFController';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/importar', upload.single('file'), pdfController.importarPDF);
router.get('/relatorio', pdfController.obterRelatorio);

export default router;
