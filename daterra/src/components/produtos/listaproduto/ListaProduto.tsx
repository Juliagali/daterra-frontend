import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import "./ListaProduto.css";
import { busca } from "../../../service/Service";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Produto from "../../../models/Produto";
import { alpha, Box, InputBase, styled } from "@mui/material";
import Categoria from "../../../models/Categoria";
import SearchIcon from '@mui/icons-material/Search';

function ListaProduto() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      toast.error("Você precisa estar logado", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
        progress: undefined,
      });
      navigate("/login");
    }
  }, [token]);

  async function getProduto() {
    await busca("/produtos/all", setProdutos, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function getCategorias() {
    await busca('/categoria/all', setCategorias, {
      headers: {
        Authorization: token,
      },
    })

  }

  useEffect(() => {
    getProduto();
    getCategorias()
  }, [produtos.length]);

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  return (
    <>
    <ul className="marcadorLista">
      <li className="btMesmaLinha"><button className="btnEstilo">TODOS OS PRODUTOS</button></li>
      {categorias.map((categoria) => (
          <li className='btMesmaLinha'> <Link to={`/categoria/${categoria.id}`}><button className='btnEstilo'>{categoria.tipo}</button></Link> </li>
        ))}

      <li className="btMesmaLinha"><button className="btnEstilo">QUERO DOAR</button></li>
      <li className="btMesmaLinha">
        <button className="btnEstilo">
         <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Pesquisar..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </button>
      </li>
      
    </ul>


     {produtos.length===0 &&<span className="loader"></span>}
      {produtos.map((produto) => (
        <Box m={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Produtos
              </Typography>
              <Typography variant="h5" component="h2">
                {produto.nome}
              </Typography>
              <Typography variant="body2" component="p">
                {produto.descricao}
              </Typography>
              <Typography variant="body2" component="p">
                {produto.categoria?.tipo}
              </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link to={`/formularioProduto/${produto.id}`} className="text-decorator-none">
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      className="marginLeft"
                      size="small"
                      color="primary"
                    >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link to={`/deletarProduto/${produto.id}`} className="text-decorator-none">
                  <Box mx={1}>
                    <Button variant="contained" size="small" color="secondary">
                      deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  );
}

export default ListaProduto;