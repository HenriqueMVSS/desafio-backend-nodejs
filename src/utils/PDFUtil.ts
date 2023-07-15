import fs from 'fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import Boleto from '../models/Boleto';

class PDFUtil {
  private pdfDoc: PDFDocument | null;

  constructor(filePath?: string) {
    this.pdfDoc = null;

    if (filePath) {
      const pdfBytes = fs.readFileSync(filePath);
      this.loadPDFBytes(pdfBytes);
    }
  }

  private async loadPDFBytes(pdfBytes: Uint8Array): Promise<void> {
    this.pdfDoc = await PDFDocument.load(pdfBytes);
  }

  public async splitPDF(outputFolderPath: string): Promise<void> {
    const boletos = await Boleto.findAll();

    if (!this.pdfDoc) {
      throw new Error('Documento PDF não carregado');
    }

    for (let i = 0; i < boletos.length; i++) {
      const boleto = boletos[i];
      const outputFilePath = `${outputFolderPath}/${boleto.id}.pdf`;

      const newPDFDoc = await PDFDocument.create();
      const copiedPage = await newPDFDoc.copyPages(this.pdfDoc, [i]);
      newPDFDoc.addPage(copiedPage[0]);

      const pdfBytes = await newPDFDoc.save();
      fs.writeFileSync(outputFilePath, pdfBytes);
    }
  }public async generateReport(boletos: typeof Boleto[]): Promise<string> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const padding = 10;
    const tableWidth = page.getWidth() - padding * 2;

    let y = page.getHeight() - padding;

    page.drawText('ID', {
      x: padding,
      y,
      font,
      size: fontSize,
    });
    y -= fontSize + padding;

    page.drawText('Nome Sacado', {
      x: padding,
      y,
      font,
      size: fontSize,
    });
    y -= fontSize + padding;

    page.drawText('ID Lote', {
      x: padding,
      y,
      font,
      size: fontSize,
    });
    y -= fontSize + padding;

    page.drawText('Valor', {
      x: padding,
      y,
      font,
      size: fontSize,
    });
    y -= fontSize + padding;

    page.drawText('Linha Digitável', {
      x: padding,
      y,
      font,
      size: fontSize,
    });
    y -= fontSize + padding;

    page.drawText('Ativo', {
      x: padding,
      y,
      font,
      size: fontSize,
    });
    y -= fontSize + padding;

    for (const boleto of boletos) {
      y = y - padding;

      page.drawText(boleto.id.toString(), {
        x: padding,
        y,
        font,
        size: fontSize,
      });
      y -= fontSize + padding;

      page.drawText(boleto.nome_sacado, {
        x: padding,
        y,
        font,
        size: fontSize,
      });
      y -= fontSize + padding;

      page.drawText(boleto.id_lote.toString(), {
        x: padding,
        y,
        font,
        size: fontSize,
      });
      y -= fontSize + padding;

      page.drawText(boleto.valor.toString(), {
        x: padding,
        y,
        font,
        size: fontSize,
      });
      y -= fontSize + padding;

      page.drawText(boleto.linha_digitavel, {
        x: padding,
        y,
        font,
        size: fontSize,
      });
      y -= fontSize + padding;

      page.drawText(boleto.ativo ? 'Sim' : 'Não', {
        x: padding,
        y,
        font,
        size: fontSize,
      });
      y -= fontSize + padding;
    }

    const pdfBytes = await pdfDoc.save();
    const base64PDF = Buffer.from(pdfBytes).toString('base64');

    return base64PDF;
  }
}

export default PDFUtil;
