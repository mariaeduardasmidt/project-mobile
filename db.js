import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "exemploLista.sqlite";

const SQL_CREATE_ENTRIES = [
  `CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY autoincrement,
      name VARCHAR(255) NOT NULL,
      qtd INTEGER DEFAULT 1 NOT NULL,
      comprado VARCHAR(1) DEFAULT "N" NOT NULL
    )`,
];

let _db = null;

export function executeSql(query, params = []) {

  /* Esta é uma função atalho para a execução de códigos SQL que possuem apenas uma linha.
   * a vantagen de uso dessa função, é que antes de rodarmos a 'query', ela irá verificar se
   * a conexão com o Banco de Dados já foi estabelecida. */

  if (!_db) {
    openDB();
  }

  return new Promise((resolve, reject) => {
    _db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, rs) => resolve(rs),
        (_, err) => reject(err)
      );
    });
  });
}

export default function openDB() {
  if (!_db) {
    _db = SQLite.openDatabase(DATABASE_NAME);

    /* No primeiro momento ao abrir a conexão, iremos tentar criar as tabelas. */

    _db.transaction(
      tx => {
        /* Sendo um array de 'CREATE TABLE', iremos 'transicionar' uma vez para cada 'TABLE' a ser criada. */

        SQL_CREATE_ENTRIES.map(query => {
          tx.executeSql(query);
        });
      },
      err => console.warn(err),
      () => console.log(`Banco iniciado`)
    );
  }

  return _db;
}