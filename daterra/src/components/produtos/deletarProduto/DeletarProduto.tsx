import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import Produto from '../../../models/Produto';
import { Box } from '@mui/material';


function DeletarProduto() {
  let navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const token = useSelector<TokenState,TokenState['tokens']>(
    (state) => state.tokens
  );
  const [produto,setProduto] = useState<Produto>()
  
useEffect(()=>{
  if(token==''){
    toast.error("Você precisa estar logado", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "light",
      progress: undefined,
    });
    navigate('/login')
  }
})

  useEffect(()=>{
    if(id!==undefined){
      findById(id)
    }
  },[id])

  async function findById(id:string) {
    buscaId(`/produtos/${id}`,setProduto,{
      headers:{
        'Authorization': token
      }
    })
  }

    function sim(){
      navigate('/produtos')
        deleteId(`/produtos/${id}`,{
          headers:{
            'Authorization': token
          }
        });
        toast.success("Produto deletado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
          progress: undefined,
        });
    }

    function nao(){
      navigate('/produtos')
    }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Produto:
              </Typography>
              <Typography color="textSecondary">
                {produto?.nome}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim}variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarProduto;