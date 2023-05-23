import axios from "axios";
import { useEffect, useState } from "react";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";

const ListaRestaurantes = () => {
  //Extrair Lista de Object para um Array
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  //Implement Paginação
  const [proximaPagina, setProximaPagina] = useState("");
  useEffect(() => {
    axios //Obter restaurante
      //Obs.: O uso do GENERICS. Tipo de retorno (Paginação)IPaginacao
      //De quê? IRestaurante
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        console.log("Resposta.: ", resposta);
        setProximaPagina(resposta.data.next);
      })
      .catch((erro) => {
        console.error(erro);
      });
  }, []);
  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((resposta) => {
        setRestaurantes([...restaurantes, ...resposta.data.results]);
        console.log("Resposta.: ", resposta);
        setProximaPagina(resposta.data.next);
      })
      .catch((erro) => {
        console.error(erro);
      });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={verMais}>Ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
