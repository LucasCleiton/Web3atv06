const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;

// configurar conexão com MySQL

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web3aula6'


});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ' + err.message);

    } else {
        console.log('conetando ao MySQL');
    }
});




// Middleware para lidar com dados codifgicados no corpo da solicitação

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



////// METODOS GET


// Rota para tratar o método GET para buscar USER
app.get('/api/user', (req, res) => {
    const sql = 'SELECT * FROM user;'
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao Consultar Registro' + err.message);
            res.status(500).json({ error: 'Erro ao buscar registro' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Rota para tratar o método GET para buscar BOARD
app.get('/api/Produtos', (req, res) => {
    const sql = 'SELECT * FROM board;'
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao Consultar Registro' + err.message);
            res.status(500).json({ error: 'Erro ao buscar registro' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Rota para tratar o método GET para buscar THREAD
app.get('/api/Clientes', (req, res) => {
    const sql = 'SELECT * FROM thread;'
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao Consultar Registro' + err.message);
            res.status(500).json({ error: 'Erro ao buscar registro' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Rota para tratar o método GET para buscar ANSWER
app.get('/api/answer', (req, res) => {
    const sql = 'SELECT * FROM answer;'
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao Consultar Registro' + err.message);
            res.status(500).json({ error: 'Erro ao buscar registro' });
        } else {
            res.status(200).json(result);
        }
    });
});



////////// METODOS POST //////////


// Rota para Tratar do método POST para inserir uma USER
app.post('/api/user', (req, res) => {
    const { nome, dataIngresso, ultimoIp } = req.body;


    const sql = 'INSERT INTO user( nome, dataIngresso, ultimoIp) VALUES(?,?,?)';
    connection.query(sql, [nome, dataIngresso, ultimoIp], (err, result) => {
        if (err) {
            console.error('Erro ao inserir registro' + err.mensage)
            res.status(500).json({ error: 'Erro ao inserir registro' });
        } else {
            console.log('Registo inserido com sucesso!');
            res.status(201).json({ message: 'Registro inserido com sucesso' })
        }

    });
});

// Rota POST para  BOARD
app.post('/api/board', (req, res) => {
    const { nome, mensagem } = req.body;
    // Inserir os dados na tabela  no banco de dados usando uma query

    const sql = 'INSERT INTO board( nome, mensagem) VALUES(?,?)';
    connection.query(sql, [nome, mensagem], (err, result) => {

        if (err) {
            console.error('Erro ao inserir registro' + err.mensage)
            res.status(500).json({ error: 'Erro ao inserir registro' });
        } else {
            console.log('Registo inserido com sucesso!');
            res.status(201).json({ message: 'Registro inserido com sucesso' })
        }

    });
});

// Rota POST para  THREAD
app.post('/api/thread', (req, res) => {
    const { titulo, mensagem, arquivo, board_idboard, dataCriacao, user_iduser, ip, clicks } = req.body;
    // Inserir os dados na tabela  no banco de dados usando uma query

    const sql = 'INSERT INTO thread ( titulo,mensagem ,arquivo ,board_idboard,dataCriacao,user_iduser,ip,clicks) VALUES(?,?,?,?,?,?,?,?)';
    connection.query(sql, [titulo, mensagem, arquivo, board_idboard, dataCriacao, user_iduser, ip, clicks], (err, result) => {

        if (err) {
            console.error('Erro ao inserir registro' + err.mensage)
            res.status(500).json({ error: 'Erro ao inserir registro' });
        } else {
            console.log('Registo inserido com sucesso!');
            res.status(201).json({ message: 'Registro inserido com sucesso' })
        }

    });
});

// Rota POST para  ANSWER
app.post('/api/answer', (req, res) => {
    const { mensagem, arquivo, thread_idthread, dataCriacao, user_iduser, ip } = req.body;
    // Inserir os dados na tabela  no banco de dados usando uma query

    const sql = 'INSERT INTO answer ( mensagem, arquivo, thread_idthread, dataCriacao, user_iduser,  ip) VALUES(?,?,?,?,?,?,?)';
    connection.query(sql, [mensagem, arquivo, thread_idthread, dataCriacao, user_iduser, ip], (err, result) => {

        if (err) {
            console.error('Erro ao inserir registro' + err.mensage)
            res.status(500).json({ error: 'Erro ao inserir registro' });
        } else {
            console.log('Registo inserido com sucesso!');
            res.status(201).json({ message: 'Registro inserido com sucesso' })
        }

    });
});










////// METODOS PUT ////////////


// Rota para lidar com o PUT para atualizar USER
app.put('/api/user/:idOuNome', (req, res) => {
    const { idOuNome } = req.params;
    const { nome, descricao } = req.body;

    // Atualizando os dados da tabela

    /// verificando nome ou id

    // Se não for String é ID 
    if (!isNaN(idOuNome)) {

        const sql = 'UPDATE user SET nome = ?, dataIngresso = ?,ultimoIp = ? , WHERE id = ?;';
        connection.query(sql, [nome, descricao, idOuNome], (err, result) => {
            if (err) {
                console.error('Erro ao Atualizar registro:' + err.message);
                res.status(500).json({ error: 'Erro ao Atualizar reegistro' });
            } else {
                console.log('Registro Atualizado com Sucesso');
                res.status(200).json({ mensage: "Registro Atualizado!" });
            }
        });

        // Caso contrario é nome
    } else {

        const sql = 'UPDATE user SET   nome = ? , dataIngresso = ?, ultimoIp = ? , WHERE  nome = ? ;';
        connection.query(sql, [nome, descricao, idOuNome], (err, result) => {
            if (err) {
                console.error('Erro ao Atualizar registro:' + err.message);
                res.status(500).json({ error: 'Erro ao Atualizar reegistro' });
            } else {
                console.log('Registro Atualizado com Sucesso');
                res.status(200).json({ mensage: "Registro Atualizado!" });
            }
        });
    }

});

///  Rota PUT para BOARD
app.put('/api/board/:idOuNome', (req, res) => {
    const { idOuNome } = req.params;
    const { nome, descricao, preco, id_categoria, disponivel } = req.body;


    if (!isNaN(idOuNome)) {

        const sql = 'UPDATE board SET nome = ?, descricao = ?, preco = ?, id_categoria = ?, disponivel = ? WHERE id = ?;';
        connection.query(sql, [nome, descricao, preco, id_categoria, disponivel, idOuNome], (err, result) => {
            if (err) {
                console.error('Erro ao Atualizar registro:' + err.message);
                res.status(500).json({ error: 'Erro ao Atualizar reegistro' });
            } else {
                console.log('Registro Atualizado com Sucesso');
                res.status(200).json({ mensage: "Registro Atualizado!" });
            }
        });

    } else {
        const sql = 'UPDATE board SET  nome = ?, descricao = ?, preco = ?, id_categoria = ?, disponivel = ? WHERE nome = ?;';
        connection.query(sql, [nome, descricao, preco, id_categoria, disponivel, idOuNome], (err, result) => {
            if (err) {
                console.error('Erro ao Atualizar registro:' + err.message);
                res.status(500).json({ error: 'Erro ao Atualizar reegistro' });
            } else {
                console.log('Registro Atualizado com Sucesso');
                res.status(200).json({ mensage: "Registro Atualizado!" });
            }
        });
    }
});

///  Rota PUT para THREAD
app.put('/api/thread/:idOuNome', (req, res) => {
    const { idOuNome } = req.params;
    const { titulo, mensagem, arquivo, board_idboard, dataCriacao, user_iduser, ip, clicks } = req.body;

    if (!isNaN(idOuNome)) {

        const sql = 'UPDATE thread SET titulo = ?,mensagem = ? ,arquivo = ? ,board_idboard = ?,dataCriacao = ?,user_iduser = ?,ip = ?,clicks = ? WHERE id = ?;';
        connection.query(sql, [titulo, mensagem, arquivo, board_idboard, dataCriacao, user_iduser, ip, clicks], (err, result) => {
            if (err) {
                console.error('Erro ao Atualizar registro:' + err.message);
                res.status(500).json({ error: 'Erro ao Atualizar reegistro' });
            } else {
                console.log('Registro Atualizado com Sucesso');
                res.status(200).json({ mensage: "Registro Atualizado!" });
            }
        });
    } else {
        const sql = 'UPDATE thread SET titulo = ?,mensagem = ? ,arquivo = ? ,board_idboard = ?,dataCriacao = ?,user_iduser = ?,ip = ?,clicks = ? WHERE nome = ?;';
        connection.query(sql, [titulo, mensagem, arquivo, board_idboard, dataCriacao, user_iduser, ip, clicks], (err, result) => {
            if (err) {
                console.error('Erro ao Atualizar registro:' + err.message);
                res.status(500).json({ error: 'Erro ao Atualizar reegistro' });
            } else {
                console.log('Registro Atualizado com Sucesso');
                res.status(200).json({ mensage: "Registro Atualizado!" });
            }
        });
    }
});

///  Rota PUT para ANSWER
app.put('/api/answer/:id', (req, res) => {
    const { id } = req.params;
    const { mensagem, arquivo, thread_idthread, dataCriacao, user_iduser, ip } = req.body;

    const sql = 'UPDATE answer SET mensagem = ?, arquivo = ?, thread_idthread = ?, dataCriacao = ?, user_iduser = ?, ip = ? WHERE id = ?;';
    connection.query(sql, [mensagem, arquivo, thread_idthread, dataCriacao, user_iduser, ip], (err, result) => {
        if (err) {
            console.error('Erro ao Atualizar registro:' + err.message);
            res.status(500).json({ error: 'Erro ao Atualizar reegistro' });
        } else {
            console.log('Registro Atualizado com Sucesso');
            res.status(200).json({ mensage: "Registro Atualizado!" });
        }
    });
});




////////// METODOS DELETE ////////////


// Excluir o Registro na tabela USER
app.delete('/api/user/:idOuNome', (req, res) => {
    const { idOuNome } = req.params;


    if (!isNaN(idOuNome)) {
        // Excluir Registro na Tabela '' no banco
        const sql = 'DELETE FROM user WHERE id=?';
        connection.query(sql, [idOuNome], (err, result) => {

            if (err) {
                console.error('Erro ao Excluir Registro' + err.message);
                res.status(500).json({ erro: 'Erro ao excluir registro' });
            } else {
                if (result.affectedRows > 0) {
                    console.log('Registro excluido com Sucesso!');
                    res.status(200).json({ message: 'Registro excluido' })
                } else {
                    console.log('Registro não encontrado');
                    res.status(404).json({ message: 'Registo não encontrado ' });
                }
            }
        });



    } else {

        const sql = 'DELETE FROM user WHERE nome=?';
        connection.query(sql, [idOuNome], (err, result) => {

            if (err) {
                console.error('Erro ao Excluir Registro' + err.message);
                res.status(500).json({ erro: 'Erro ao excluir registro' });
            } else {
                if (result.affectedRows > 0) {
                    console.log('Registro excluido com Sucesso!');
                    res.status(200).json({ message: 'Registro excluido' })
                } else {
                    console.log('Registro não encontrado');
                    res.status(404).json({ message: 'Registo não encontrado ' });
                }
            }
        });


    }

});

// Excluir o Registro de  BOARD
app.delete('/api/board/:idOuNome', (req, res) => {
    const { idOuNome } = req.params;

    // Excluir Registro na Tabela 'CATEGORIA' no banco

    if (!isNaN(idOuNome)) {
        const sql = 'DELETE FROM board WHERE id = ?;';
        connection.query(sql, [idOuNome], (err, result) => {
            if (err) {
                console.error('Erro ao Excluir Registro' + err.message); s
                res.status(500).json({ erro: 'Erro ao excluir registro' });
            } else {
                if (result.affectedRows > 0) {
                    console.log('Registro excluido com Sucesso!');
                    res.status(200).json({ message: 'Registro excluido' })
                } else {
                    console.log('Registro não encontrado');
                    res.status(404).json({ message: 'Registo não encontrado ' });
                }
            }
        });
    } else {
        const sql = 'DELETE FROM board WHERE nome = ?;';
        connection.query(sql, [idOuNome], (err, result) => {

            if (err) {
                console.error('Erro ao Excluir Registro' + err.message);
                res.status(500).json({ erro: 'Erro ao excluir registro' });
            } else {
                if (result.affectedRows > 0) {
                    console.log('Registro excluido com Sucesso!');
                    res.status(200).json({ message: 'Registro excluido' })
                } else {
                    console.log('Registro não encontrado');
                    res.status(404).json({ message: 'Registo não encontrado ' });
                }
            }
        });
    }
});

// Excluir o Registro de  THREAD
app.delete('/api/Clientes/:idOuNome', (req, res) => {
    const { idOuNome } = req.params;

    // Excluir Registro na Tabela 'CATEGORIA' no banco

    if (!isNaN(idOuNome)) {
        const sql = 'DELETE FROM thread WHERE id = ?;';
        connection.query(sql, [idOuNome], (err, result) => {
            if (err) {
                console.error('Erro ao Excluir Registro' + err.message); s
                res.status(500).json({ erro: 'Erro ao excluir registro' });
            } else {
                if (result.affectedRows > 0) {
                    console.log('Registro excluido com Sucesso!');
                    res.status(200).json({ message: 'Registro excluido' })
                } else {
                    console.log('Registro não encontrado');
                    res.status(404).json({ message: 'Registo não encontrado ' });
                }
            }
        });
    } else {
        const sql = 'DELETE FROM thread WHERE nome = ?;';
        connection.query(sql, [idOuNome], (err, result) => {

            if (err) {
                console.error('Erro ao Excluir Registro' + err.message);
                res.status(500).json({ erro: 'Erro ao excluir registro' });
            } else {
                if (result.affectedRows > 0) {
                    console.log('Registro excluido com Sucesso!');
                    res.status(200).json({ message: 'Registro excluido' })
                } else {
                    console.log('Registro não encontrado');
                    res.status(404).json({ message: 'Registo não encontrado ' });
                }
            }
        });
    }
});

// Excluir o Registro de ANSWER
app.delete('/api/answer/:id', (req, res) => {
    const { id } = req.params;
    // Excluir Registro na Tabela 'CATEGORIA' no banco
    const sql = 'DELETE FROM answer WHERE id = ?;';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao Excluir Registro' + err.message);
            res.status(500).json({ erro: 'Erro ao excluir registro' });
        } else {
            if (result.affectedRows > 0) {
                console.log('Registro excluido com Sucesso!');
                res.status(200).json({ message: 'Registro excluido' })
            } else {
                console.log('Registro não encontrado');
                res.status(404).json({ message: 'Registo não encontrado ' });
            }
        }
    });
});




///////////////////////////////////////////////////////////////////////////////////////////////////




// Iniicar o servidor

app.listen(port, () => {
    console.log('Servidor iniciado na porta ${port}');
});