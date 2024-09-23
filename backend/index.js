require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.error("Erro ao conectar ao banco de dados", error);
    return;
  } else {
    console.log("Conectado ao banco de dados!");
  }
});

// LISTAR FICHAS DA COMUNIDADE
app.get("/api/ListarTodasFichas", (req, res) => {
  const userId = req.query.id;

  const sql = `
    SELECT f.*, u.nome_completo AS nome_completo 
    FROM ficha f 
    JOIN usuario u ON f.fk_Usuario_id_usuario = u.id_usuario
    WHERE f.fk_Usuario_id_usuario <> ?
    ORDER BY id_ficha DESC
  `;

  connection.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Erro ao listar fichas:", error);
      return res.status(500).json({ error: "Erro ao listar fichas" });
    }
    res.send(results);
  });
});

// LISTAR FICHAS DO USUÁRIO
app.get("/api/ListarFichasUsuario", (req, res) => {
  const userId = req.query.id;

  const sql = `
    SELECT f.*, u.nome_completo AS nome_completo 
    FROM ficha f
    JOIN usuario u ON f.fk_Usuario_id_usuario = u.id_usuario
    WHERE f.fk_Usuario_id_usuario = ?
    ORDER BY id_ficha DESC
  `;

  connection.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Erro ao listar fichas do usuário:", error);
      return res.status(500).json({ error: "Erro ao listar fichas do usuário" });
    }
    res.send(results);
  });
});


// LISTAR TOP 5 FICHAS MELHOR AVALIADAS
app.get("/api/ListarTopFichas", (req, res) => {
  const sql = `
    SELECT f.id_ficha, f.titulo_ficha, f.pdf_ficha, AVG(a.avaliacao) AS media_avaliacao, u.nome_completo
    FROM ficha f
    JOIN avaliacoes a ON f.id_ficha = a.id_ficha
    JOIN usuario u ON f.fk_Usuario_id_usuario = u.id_usuario
    GROUP BY f.id_ficha, u.nome_completo
    ORDER BY media_avaliacao DESC
    LIMIT 5;
  `;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Erro ao listar as 5 melhores fichas:", error);
      return res.status(500).json({ error: "Erro ao listar fichas" });
    }
    res.status(200).json(results);
  });
});



// CADASTRAR USUÁRIO
app.post("/api/CadastrarUsuario", (req, res) => {
  const { nome_usuario, nome_completo, email, senha } = req.body;

  if (!nome_usuario || !nome_completo || !email || !senha) {
    return res
      .status(400)
      .json({ error: "Todos os campos são de preenchimento obrigatório" });
  }

  const hashedPassword = bcrypt.hashSync(senha, 10);

  const sql =
    "INSERT INTO usuario (nome_usuario, nome_completo, email, senha) VALUES (?, ?, ?, ?)";
  const values = [nome_usuario, nome_completo, email, hashedPassword];

  connection.query(sql, values, (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.sqlMessage.includes('email')) {
          return res.status(400).json({ error: "O email já está em uso!" });
        }
        if (error.sqlMessage.includes('nome_usuario')) {
          return res.status(400).json({ error: "O nome de usuário já está em uso!" });
        }
      }else{
        console.error("Erro ao inserir novo usuário", error);
        return res.status(500).json({ error: "Erro ao inserir novo usuario" });
      }
    }
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso!", id: results.insertId });
  });
});

// LOGIN USUÁRIO
app.post("/api/LoginUsuario", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de e-mail inválido." });
  }

  const sql = "SELECT * FROM usuario WHERE email = ?";

  connection.query(sql, [email], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Erro ao buscar usuário." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    }

    const user = results[0];

    const validPassword = bcrypt.compareSync(senha, user.senha);

    if (!validPassword) {
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    }

    res.status(200).json({
      message: "Login bem-sucedido!",
      user: {
        id: user.id_usuario,
        nome: user.nome_completo,
      },
    });
  });
});

// CADASTRAR FICHA
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

app.post("/api/AdicionarFicha", upload.single("file"), (req, res) => {
  const { title, id_user } = req.body;
  
  if (!req.file || !title || !id_user) {
    return res
      .status(400)
      .json({ error: "Todos os campos são de preenchimento obrigatório" });
  }

  const filePath = req.file.path.replace(/\\/g, "/");

  const sql =
    "INSERT INTO ficha (pdf_ficha, fk_Usuario_id_usuario, titulo_ficha) VALUES (?, ?, ?)";
  const values = [filePath, id_user, title];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Erro ao inserir nova ficha.", error);
      return res.status(500).json({ error: "Erro ao inserir nova ficha." });
    }

    res.status(200).json({
      message: "Ficha salva com sucesso!",
      id: results.insertId,
      filePath,
    });
  });
});

// EDITAR FICHA
app.put("/api/EditarFicha/:id_ficha", (req, res) => {
  const { id_ficha } = req.params;
  const { pdf_ficha } = req.body;

  if (!pdf_ficha) {
    return res
      .status(400)
      .json({ error: "Este campo possui preenchimento obrigatório" });
  }

  let sql = "UPDATE ficha SET pdf_ficha = ? WHERE id_ficha = ?";
  let values = [pdf_ficha, id_ficha];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Erro ao editar ficha", error);
      return res.status(500).json({ error: "Erro ao editar ficha" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Ficha nao encontrada" });
    }

    res.status(200).json({ message: "Ficha editada com sucesso!" });
  });
});

// DELETAR FICHA
app.delete("/api/DeletarFicha/:id", (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM avaliacoes WHERE id_ficha = ?";


  connection.query(sql,[id], (error, results) => {
    if (error) {
      console.error("Erro ao deletar ficha", error);
      return res.status(500).json({ error: "Erro ao deletar ficha" });
    }
  });

  sql = "DELETE FROM ficha WHERE id_ficha = ?";

  connection.query(sql,[id], (error, results) => {
    if (error) {
      console.error("Erro ao deletar ficha", error);
      return res.status(500).json({ error: "Erro ao deletar ficha" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Ficha não encontrada" });
    }

    res.status(200).json({ message: "Ficha deletada com sucesso!" });
  });

});

app.get("/api/ListarAvaliacoesUsuario/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT * FROM avaliacoes WHERE id_usuario = ?";
  
  connection.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Erro ao listar avaliações:", error);
      return res.status(500).json({ error: "Erro ao listar avaliações" });
    }
    res.send(results);
  });
});


app.post("/api/AvaliarFicha", (req, res) => {
  const { id_user, id_sheet, rating } = req.body;
  
  const sql = `INSERT INTO avaliacoes (id_usuario, id_ficha, avaliacao) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE avaliacao = VALUES(avaliacao)`;

  connection.query(sql, [id_user, id_sheet, rating], (error, results) => {
    if(error){
      console.error("Erro ao adicionar avaliação:", error);
      return res.status(500).json({error: "Erro ao adicionar avaliação"});
    }
    res.status(200).json({message: "Avaliação adicionada/atualizada com sucesso!"})
  })
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
