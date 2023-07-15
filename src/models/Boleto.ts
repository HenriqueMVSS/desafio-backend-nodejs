import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import Lote from './Lote';

const Boleto = sequelize.define('boletos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_sacado: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_lote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    linha_digitavel: {
      type: DataTypes.STRING(255),
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

Boleto.belongsTo(Lote, { foreignKey: 'id_lote', targetKey: 'id' });

export default Boleto;
