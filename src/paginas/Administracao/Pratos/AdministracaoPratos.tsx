import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);
  useEffect(() => {
    http
      .get<IPrato[]>("pratos/")
      //.then((resposta) => setPratos(resposta.data))
      .then((resposta) => {
        const dados = resposta.data;
        setPratos(dados);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const excluir = (pratosExcluir: IPrato) => {
    http.delete(`pratos/${pratosExcluir.id}/`).then(() => {
      const listaNovospratos = pratos.filter(
        (item) => item.id !== pratosExcluir.id
      );
      setPratos([...listaNovospratos]);
    });
  };
  return (
    <section style={{ padding: "5em", overflowY: "hidden" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.tag}</TableCell>
                <TableCell>
                  [
                  <a href={item.imagem} target="_blank" rel="noreferrer">
                    ver imagem
                  </a>
                  ]
                </TableCell>
                <TableCell>
                  [ <Link to={`/admin/pratos/${item.id}`}>editar</Link> ]
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => excluir(item)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
export default AdministracaoPratos;
