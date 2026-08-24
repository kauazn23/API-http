import http, { get } from 'node:http'

const porta = 3000

const tarefas = [
    { id: 1, nome: "Lavar louças" },
    { id: 2, nome: "Comprar uma RTX 5090" }
]

const server = http.createServer((req, res) => {

    res.setHeader('Content-type', 'application/json')

    if (req.method == 'GET' && req.url == '/tarefas') {
        res.statusCode = 200
        res.end(JSON.stringify(tarefas))
    }
    else if (req.method == 'POST' && req.url == '/tarefas') {
        let body = ''

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const novaTarefa = JSON.parse(body)
                if (!novaTarefa.nome) {
                    res.statusCode = 400
                    res.end(JSON.stringify({ error: "O campo 'nome' é obrigatório." }))
                }

                tarefas.push(tarefaCriada)

                res.statusCode = 201;
                res.end(JSON.stringify(tarefaCriada))
            } catch (error) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'Formato JSON inválido!' }))
            }

        })
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ error: 'Rota não encontrada' }))

    }

});

server.listen(porta, () => {
    console.log(`Servidor funcionando na porta ${porta}`);
}); 