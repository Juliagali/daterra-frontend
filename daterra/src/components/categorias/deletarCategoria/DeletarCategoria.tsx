import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import Categoria from '../../../models/Categoria';
import { Box } from '@mui/material';


function DeletarCategoria() {
  let navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const token = useSelector<TokenState,TokenState['tokens']>(
    (state) => state.tokens
  );
  const [categoria,setCategoria] = useState<Categoria>()
  
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
    buscaId(`/categoria/${id}`,setCategoria,{
      headers:{
        'Authorization': token
      }
    })
  }

    function sim(){
      navigate('/categorias')
        deleteId(`/categoria/${id}`,{
          headers:{
            'Authorization': token
          }
        });
        toast.success("Categoria deletada com sucesso", {
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
      navigate('/categorias')
    }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Categoria:
              </Typography>
              <Typography color="textSecondary">
                {categoria?.tipo}
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
export default DeletarCategoria;