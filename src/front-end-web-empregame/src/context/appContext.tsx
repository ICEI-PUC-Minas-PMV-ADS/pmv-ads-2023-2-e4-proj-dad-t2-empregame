"use client";

import { IUsuario } from "@/interface/IUsuario";
import React, { Dispatch, createContext, useContext, useReducer } from "react";

interface IAppReducer {
  loading: boolean;
  usuario: IUsuario | null;
}

type UserType =
  | { type: "SET_USUARIO"; payload: IAppReducer["usuario"] }
  | { type: "SET_LOADING"; payload: boolean };

const INITIAL_STATE: IAppReducer = {
  loading: false,
  usuario: null,
};

const reducer = (state: IAppReducer, action: UserType): IAppReducer => {
  switch (action.type) {
    case "SET_USUARIO":
      return { ...state, usuario: action.payload };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: IAppReducer;
  dispatch: Dispatch<UserType>;
}>({ state: INITIAL_STATE, dispatch: () => null });

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
