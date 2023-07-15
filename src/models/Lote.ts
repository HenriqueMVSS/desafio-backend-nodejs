import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Lote = sequelize.define('lotes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    criado_em: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }
);

async function inserirDadosLote() {
  try {
    await Lote.create({id: 3, nome: '0017' });
    await Lote.create({id: 6, nome: '0018' });
    await Lote.create({id: 7, nome: '0019' });

    console.log('Dados inseridos com sucesso na tabela lotes.');
  } catch (error) {
    console.error('Erro ao inserir dados na tabela lotes:', error);
  }
}

inserirDadosLote();


export default Lote;
