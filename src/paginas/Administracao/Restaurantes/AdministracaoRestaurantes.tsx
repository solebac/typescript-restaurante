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
import IRestaurante from "../../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  useEffect(() => {
    http
      .get<IRestaurante[]>("restaurantes/")
      //.then((resposta) => setRestaurantes(resposta.data))
      .then((resposta) => {
        const dados = resposta.data;
        setRestaurantes(dados);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const excluir = (restauranteExcluir: IRestaurante) => {
    http.delete(`restaurantes/${restauranteExcluir.id}/`).then(() => {
      const listaNovosRestaurante = restaurantes.filter(
        (item) => item.id !== restauranteExcluir.id
      );
      setRestaurantes([...listaNovosRestaurante]);
    });
  };
  return (
    <section style={{ padding: "5em", overflowY: "hidden" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>
                  [ <Link to={`/admin/restaurantes/${item.id}`}>editar</Link> ]
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
export default AdministracaoRestaurantes;
