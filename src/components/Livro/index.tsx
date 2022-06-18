import { Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { ILivro } from '../../api/LivroService';
import './Livro.scss'

interface IProps {
    livro: ILivro,
    handleClickConfirm: () => void
}

function Livro({livro, handleClickConfirm}: IProps) {
    return ( 
        <Paper className='livroBox' elevation={3}>
            <div className='livro'>
                <div className='livro__title'>
                    <p><span>Título:</span> {livro.titulo || 'Não informado'}</p>
                </div>
                <div>
                    <p><span>ISBN:</span> {livro.isbn}</p>
                </div>
                <div>
                    <p><span>ISSN:</span> {livro.issn || 'N/A'}</p>
                </div>
                <div>
                    <p><span>Idioma:</span> {livro.idioma}</p>
                </div>
            </div>
            <div className='livro'>
                <div className='livro__title'>
                    <p><span>Autor:</span> {livro.autor}</p>
                </div>
                <div>
                    <p><span>Editora:</span> {livro.editora || 'N/A'}</p>
                </div>
                <div>
                    <p><span>Ano de Publicação:</span> {livro.anoEdicao}</p>
                </div>
                <div>
                    <p><span>Nº de Páginas:</span> {livro.numeroDePaginas}</p>
                </div>
            </div>
            <div className="livro">
                <div>
                    <p>
                        <span>Descrição: </span>
                        {livro.descricao}
                    </p>
                </div>
            </div>
            <div className='acoes'>
                <Button 
                    color='primary' 
                    variant='contained' 
                    sx={{fontWeight: 'bold'}}
                    onClick={handleClickConfirm}
                >
                    Confirmar
                </Button>
                <Link to={`/acervo-gestao/edicao/${livro.isbn || livro.issn}`}>
                    <Button color='primary' variant='contained' sx={{fontWeight: 'bold'}}>Alterar</Button>
                </Link>
            </div>
        </Paper>
     );
}

export default Livro;