import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "path";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

const FormularioPratos = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [imagem, setImagem] = useState<File | null>(null);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState("");
  const [tag, setTag] = useState("");
  const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);
    if (imagem) {
      formData.append("imagem", imagem);
    }
    http
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        setNomePrato("");
        setDescricao("");
        setTag("");
        setRestaurante("");
        alert("Prato cadastrado com sucesso...!");
      })
      .catch((error) => console.error(error));
  };
  const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImagem(event.target.files[0]);
    } else {
      setImagem(null);
    }
  };
  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("tags/")
      .then((resposta) => setTags(resposta.data.tags));

    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);
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
          Formulário de Prato
        </Typography>
        <Box component="form" sx={{ width: "80%" }} onSubmit={aoSubmeterForm}>
          <TextField
            id="standard-basic"
            label="Nome do Prato"
            variant="standard"
            value={nomePrato}
            onChange={(evento) => setNomePrato(evento.target.value)}
            fullWidth
            required
            margin="dense"
          />

          <TextField
            id="standard-basic"
            label="Descrição do Prato"
            variant="standard"
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            fullWidth
            required
            margin="dense"
          />

          <FormControl fullWidth margin="dense">
            <InputLabel id="select-tag">Tag</InputLabel>
            <Select
              labelId="select-tag"
              value={tag}
              onChange={(event) => setTag(event.target.value)}
            >
              {tags.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="select-restaurantes">Restaurantes</InputLabel>
            <Select
              labelId="select-restaurantes"
              value={restaurante}
              onChange={(event) => setRestaurante(event.target.value)}
            >
              {restaurantes.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input type="file" onChange={selecionarArquivo} />
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
export default FormularioPratos;
