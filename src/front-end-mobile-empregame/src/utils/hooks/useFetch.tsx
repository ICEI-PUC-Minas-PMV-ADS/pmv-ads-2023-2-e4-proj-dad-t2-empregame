"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useFetch<T = unknown>(
  url: string, // string para consulta
  options?: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; // metodo da consulta, req.method
    params?: object; // parametros da consulta, req.query
    headers?: object; // cabecalho da consulta, req.headers
    body?: object; // corpo da consulta, req.body
    itensRefresh?: any[]; // itens para recarregar a consulta
    enable?: boolean; // caso esteja TRUE o useEffect será executado, caso contrario ele não será executado, usad para definir se uma consulta está pronta para ser executada
    delay?: number; // tempo de delay para executar a requisição
    interval?: number;
    onSuccess?: (data: { res: AxiosResponse<T>; data: T }) => void;
    onError?: (
      error: AxiosError<
        | {
            response: {
              data: {
                statusCode: number;
                message: string;
              };
            };
          }
        | any
      >
    ) => void;
  }
) {
  const fetchAPI = url[0] === "/" ? api : axios; // decide se a api vai ser a padrão ou requisição para outras

  const [data, setData] = useState<T | null>(null); // valor que será retorndo para o front, resultado da consulta
  const [isFetching, setIsFetching] = useState(false); // se a consulta ainda está sendo realizada
  const [error, setError] = useState<AxiosError | null>(null); // se houve erro na consulta

  const [refresh, setRefresh] = useState(false); // atualizar a listagem ou não

  const refetch = () => setRefresh((old) => !old); // function para recarregar

  function runFetchingAPI() {
    setIsFetching(true); // inicia o loading

    fetchAPI(url, {
      params: options?.params,
      headers: {
        ...options?.headers,
      },
      method: options?.method || "GET",
      data: options?.body,
    })
      .then((res) => {
        setData(res.data);

        if (options?.onSuccess) options.onSuccess({ res, data: res.data });
      })
      .catch((err: AxiosError) => {
        setError(err);

        if (options?.onError) options.onError(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  function refetchUseEffect(): unknown[] {
    // itens que fazem o useEffect recarregar
    const itensParaRefresh = [refresh];

    if (options?.itensRefresh && options.itensRefresh.length > 0)
      itensParaRefresh.push(...options.itensRefresh);

    return itensParaRefresh;
  }

  useEffect(() => {
    if (options?.enable === false) return setData(null);

    if (options?.delay) {
      setTimeout(() => runFetchingAPI(), options?.delay);
    } else {
      runFetchingAPI();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refetchUseEffect());

  useEffect(() => {
    if (options?.interval) {
      let interval = setInterval(() => refetch(), options.interval);
      //destroy interval on unmount
      return () => clearInterval(interval);
    }
  });

  return {
    data,
    isFetching,
    error,
    refetch, // função para recarregar, é chamada uma função que já execute o refresh sem necessidade de passar valores
  };
}
