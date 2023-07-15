import express from 'express';
import bodyParser from 'body-parser';
import boletoRoutes from './routes/boletoRoutes';
import pdfRoutes from './routes/pdfRoutes';
import { sequelize } from './database';


const app = express();

app.use(bodyParser.json());

app.use('/boletos', boletoRoutes);
app.use('/pdf', pdfRoutes);


sequelize.sync()
  .then(() => {
    console.log('Tabelas criadas com sucesso.');
  })
  .catch((err: any) => {
    console.error('Erro ao sincronizar modelos:', err);
  });
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
