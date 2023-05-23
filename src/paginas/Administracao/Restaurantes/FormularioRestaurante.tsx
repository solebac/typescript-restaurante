import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      http
        .get<IRestaurante>(`restaurantes/${params.id}/`)
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [params]);
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (params.id) {
      http
        .put(`restaurantes/${params.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => alert("Atualizado com sucesso...!"));
    } else {
      http
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => alert("Inserido com sucesso...!"));
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGow: 1,
        }}
      >
        <Typography component="h1" variant="h6">
          Formulário de Restaurantes
        </Typography>
        <Box component="form" sx={{ width: "80%" }} onSubmit={aoSubmeterForm}>
          <TextField
            id="standard-basic"
            label="Nome do Restaurante"
            variant="standard"
            value={nomeRestaurante}
            onChange={(evento) => setNomeRestaurante(evento.target.value)}
            fullWidth
            required
          />
          <Button
            fullWidth
            sx={{ marginTop: 1 }}
            type="submit"
            variant="outlined"
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default FormularioRestaurante;
