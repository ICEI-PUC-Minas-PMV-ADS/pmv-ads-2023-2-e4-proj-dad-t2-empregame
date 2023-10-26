import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

import { api } from "../services/api";
import { authToken } from "../config/authToken";

export function useMutation<TDataSend = unknown, TDataResponse = unknown>(
  url: string, // string para consulta
  options: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; // metodo da consulta, req.method
    params?: object; // parametros da consulta, req.query
    headers?: object; // cabecalho da consulta, req.headers
    body?: Partial<TDataSend>; // corpo da consulta, req.body
    enable?: boolean; // caso esteja TRUE o useEffect será executado, caso contrario ele não será executado, usad para definir se uma consulta está pronta para ser executada
    delay?: number; // tempo de delay para executar a requisição
    onSuccess?: (data: {
      res: AxiosResponse<TDataResponse>;
      data: TDataResponse;
    }) => void;
    onError?: (error: AxiosError) => void;
  }
) {
  const mutateAPI = url[0] === "/" ? api : axios; // decide se a api vai ser a padrão ou requisição para outras

  const [cookies] = useCookies([authToken.nome]);
  api.defaults.headers.common["Authorization"] =
    "Bearer " + cookies[authToken.nome];

  const [data, setData] = useState<TDataResponse | null>(null); // valor que será retorndo para o front, resultado da consulta
  const [isFetching, setIsFetching] = useState(false); // se a consulta ainda está sendo realizada
  const [error, setError] = useState<AxiosError | null>(null); // se houve erro na consulta

  const runMutate = (dataMutate: TDataSend) =>
    mutateAPI(url, {
      params: options?.params,
      headers: {
        "content-type": "text/plain",
        ...options?.headers,
      },
      method: options?.method,
      data: {
        ...dataMutate,
        ...options?.body,
      },
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

  function mutate(dataMutate: TDataSend) {
    if (options?.enable === false) return setData(null);

    setIsFetching(true);

    if (options?.delay) {
      setTimeout(() => {
        runMutate(dataMutate);
      }, options.delay);
    } else {
      runMutate(dataMutate);
    }
  }

  return {
    data,
    isFetching,
    error,
    mutate,
  };
}
