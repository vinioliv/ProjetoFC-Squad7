const knex = require('../database');
const jwt = require('jsonwebtoken');


module.exports = {
    async index(req, res) {
        const results = await knex('Anuncio').select('*')

        return res.json(results)
    },

    async indexPage(req, res) {
        try {
            const {page = 1} = req.query

            const results = await knex('Anuncio')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'Anuncio.IdAnuncio',
                'Anuncio.Titulo',
                'Anuncio.ImagemAnuncio',
                'Anuncio.IdCategoria',
                'Anuncio.IdFornecedor']);

            return res.json(results);
        } catch(err) {
            return res.status(500)
        }
        
    },

    async indexCategoria(req, res) {
        try {
            const { id } = req.params
            const {page = 1} = req.query

            const results = await knex('Anuncio')
                .limit(5)
                .offset((page - 1) * 5)
                .select([
                    'Anuncio.IdAnuncio',
                    'Anuncio.Titulo',
                    'Anuncio.ImagemAnuncio',
                    'Anuncio.IdCategoria',
                    'Anuncio.IdFornecedor'
                ]).where('Anuncio.IdCategoria', id);

            return results = res.json(results)
        } catch(err){
            return res.status(500)
        }
        
    },

    async createAnuncio(req, res) {
        const token = req.header('auth-token');
        const decoded = jwt.decode(token, 'Hu3Lit6NrOpl9Um')
        const id = decoded._id[0].IdFornecedor;
        
        const data = { Titulo, Descricao, ImagemAnuncio, Telefone, Instagram, Facebook, Site, IdCategoria } = req.body
        
        const results = await knex('Anuncio')
            .insert({
                Titulo,
                Descricao,
                ImagemAnuncio,
                Telefone,
                Instagram,
                Facebook,
                Site,
                IdCategoria,
                IdFornecedor: id
            });
            return res.json({message: 'Anuncio cadastrado!'})

    }, 
    
    async showAnuncio(req, res){
        const {id} = req.params

        const results = await knex('Anuncio')
        .select(['Anuncio.Titulo',
        'Anuncio.Descricao',
        'Anuncio.ImagemAnuncio',
        'Anuncio.Telefone',
        'Anuncio.Instagram',
        'Anuncio.Facebook',
        'Anuncio.Site',
        'Categorias.CategoriaNome'])
        .join('Categorias', 'Categorias.IdCategoria','=', 'Anuncio.IdCategoria')
        .where('Anuncio.IdAnuncio', id)

        return res.json(results)
    }
}