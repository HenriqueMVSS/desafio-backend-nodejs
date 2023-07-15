import { Request, Response } from 'express';
import PDFService from '../services/PDFService';

class PDFController {
  public async importarPDF(req: Request, res: Response): Promise<void> {
    if (!req.file) {
        res.status(400).send("Arquivo não enviado.");
        return;
      }
    
    const filePath = req.file.path;
    const pdfService = new PDFService();

    try {
      await pdfService.splitPDF(filePath);
      res.status(200).send('PDF importado e desmembrado com sucesso.');
    } catch (error) {
      console.error('Erro ao importar e desmembrar o PDF:', error);
      res.status(500).send('Erro ao importar e desmembrar o PDF.');
    }
  }

  public async obterRelatorio(req: Request, res: Response): Promise<void> {
    const { relatorio } = req.query;

    if (relatorio === '1') {
      const pdfService = new PDFService();
      const boletos = await pdfService.getBoletos();

      try {
        const base64PDF = await pdfService.generateReport(boletos);
        res.status(200).json({ base64: base64PDF });
      } catch (error) {
        console.error('Erro ao gerar o relatório em PDF:', error);
        res.status(500).send('Erro ao gerar o relatório em PDF.');
      }
    } else {
      res.status(400).send('Parâmetro "relatorio" inválido.');
    }
  }
}

export default new PDFController();
