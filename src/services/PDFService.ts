import fs from 'fs';
import PDFUtil from '../utils/PDFUtil';
import Boleto from '../models/Boleto';

class PDFService {
  public async splitPDF(filePath: string): Promise<void> {
    const pdfUtil = new PDFUtil(filePath);
    const boletos = await Boleto.findAll();

    const outputFolderPath = './uploads';
    if (!fs.existsSync(outputFolderPath)) {
      fs.mkdirSync(outputFolderPath);
    }

    await pdfUtil.splitPDF(outputFolderPath);
  }

  public async getBoletos(){
    const boletos = await Boleto.findAll();
    return boletos;
  }

public async generateReport(boletos: typeof Boleto){
    const pdfUtil = new PDFUtil();
    const base64PDF = await pdfUtil.generateReport(boletos);
  
    return base64PDF;
  }
}

export default PDFService;
