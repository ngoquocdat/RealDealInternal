import { RealEstate } from "@dto/realEstate";
import { BaseService, IBaseServiceModel } from "./BaseService";

interface IRealEstateServiceModel extends IBaseServiceModel<RealEstate> {}

export function RealEstateService(): IRealEstateServiceModel {
  const path = "realestate";
  const { get, getDetails, create, update, remove } = BaseService<RealEstate>({
    controllerPath: path,
  });

  return {
    get,
    getDetails,
    create,
    update,
    remove,
  };
}