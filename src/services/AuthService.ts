import React, { useState } from "react";
import { api } from "./AxiosConfig";
import { Credential } from "@dto/credential";
import { LoginDTO, RegisterDTO } from "@dto/auth";

export interface IAuthServiceModel {
  credential?: Credential;
  login: (dto: LoginDTO) => Promise<void>;
  register: (dto: RegisterDTO) => Promise<void>;
  logout: () => void;
}

export function AuthService(): IAuthServiceModel {
  const controllerPath = "Authentication";
  const [credential, setCredential] = useState(getUserInforFromStorage());

  function setNewCredentialInfor(newCredential?: Credential) {
    saveCredentialToStorage(newCredential);
    setCredential(newCredential);
  }

  async function login(dto: LoginDTO) {
    const response = await api.post(`${controllerPath}/login`, dto);
    setNewCredentialInfor(response.data);
    return response.data;
  }

  async function register(model: RegisterDTO) {
    const response = await api.post(`${controllerPath}/register`, model);
    return response.data;
  }

  async function logout() {
    setNewCredentialInfor(undefined);
  }

  return { credential, login, register, logout };
}

function getUserInforFromStorage(): Credential | undefined {
  const credential = localStorage.getItem("credential");
  return credential ? JSON.parse(credential) : undefined;
}

function saveCredentialToStorage(credential?: Credential) {
  credential
    ? localStorage.setItem("credential", JSON.stringify(credential))
    : localStorage.removeItem("credential");
}
