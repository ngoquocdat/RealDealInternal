import axios from "axios";
import { api } from "./AxiosConfig";
import { IDTO } from "@dto/idto";



interface IBaseServiceProps {
  controllerPath: string;
}

export interface IBaseServiceModel<T> {
  get: () => Promise<T[]>;
  getDetails: (id: number | string) => Promise<T>;
  create: (item: T) => Promise<T> | Promise<void>;
  update: (item: T) => Promise<void>;
  remove: (id: number | string) => Promise<void>;
}

export function BaseService<T extends IDTO<number | string>>({
  controllerPath,
}: IBaseServiceProps): IBaseServiceModel<T> {
  async function get() {
    const response = await api.get<T[]>(controllerPath);
    return response?.data;
  }

  async function getDetails(id: number | string) {
    const response = await api.get<T>(`${controllerPath}/${id}`);
    return response?.data;
  }

  async function create(item: T) {
    const response = await api.post<T>(controllerPath, item);
    return response?.data;
  }

  async function update(item: T) {
    await api.put(`${controllerPath}`, item);
  }

  async function remove(id: number | string) {
    await api.delete(`${controllerPath}/${id}`);
  }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
  };
}