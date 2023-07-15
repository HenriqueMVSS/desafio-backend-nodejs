import { Request, Response } from "express";
import Boleto from "../models/Boleto";
import { Op } from "sequelize";
import { Readable } from "stream";
import readLine from "readline";

interface Boletos {
  nome_sacado: string,
  id_lote?: number,
  valor:number,
  linha_digitavel: string,
}

class BoletoController {
  public async importarBoletos(req: Request, res: Response) {
    if (!req.file) {
      res.status(400).send("Arquivo não enviado.");
      return;
    }

    const { file } = req;
    const { buffer } = file

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

   
    const boletosLine = readLine.createInterface({
      input: readableFile
    })
    
    const boletos:Boletos[] = [];

    for await (let boletoLine of boletosLine){
      let boletoLineSplit = boletoLine.split(',');
      
      if(boletoLineSplit[1] == "17" || boletoLineSplit[1] == "18" || boletoLineSplit[1] == "19") {
        const unidadeLote = getLoteUnidade(boletoLineSplit[1]);
        
        boletos.push({
          nome_sacado: boletoLineSplit[0],
          id_lote: unidadeLote,
          valor:parseFloat(boletoLineSplit[2]),
          linha_digitavel:boletoLineSplit[3]
        })     
      }
      
    }
    try {
      for await (let {nome_sacado, id_lote, valor, linha_digitavel} of boletos) {
        await Boleto.create({nome_sacado, id_lote, valor, linha_digitavel});
      }

      res.status(200).send("Boletos importados com sucesso.");

    } catch (error) {
      console.error("Erro ao importar boletos:", error);
      res.status(500).send("Erro ao importar boletos.");
    }
  }

  public async obterBoletos(req: Request, res: Response): Promise<void> {
    const { nome, valor_inicial, valor_final, id_lote } = req.query;

    const whereClause: any = {};

    if (nome) {
      whereClause.nome_sacado = nome;
    }

    if (valor_inicial && valor_final) {
      whereClause.valor = {
        [Op.between]: [parseFloat(valor_inicial as string), parseFloat(valor_final as string)],
      };
    }

    if (id_lote) {
      whereClause.id_lote = id_lote;
    }

    try {
      const boletos = await Boleto.findAll({ where: whereClause });
      res.status(200).json(boletos);
    } catch (error) {
      console.error("Erro ao buscar os boletos:", error);
      res.status(500).send("Erro ao buscar os boletos.");
    }
  }
}

function getLoteUnidade(unidade: string) {

  switch (unidade) {
    case "17":
      return 3;
    case "18":
      return 6;
    case "19":
      return 7;
    default:
      return;
  }
}

export default new BoletoController();
