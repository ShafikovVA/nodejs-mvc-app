export type IModel<ModelInstance, id extends keyof ModelInstance> = {
    getAll: () => Promise<ModelInstance[]>,
    addOne: (data: Omit<ModelInstance, id>) => Promise<ModelInstance>,
    deleteOne: (data: ModelInstance[id]) => Promise<ModelInstance>,
    updateOne: (data: ModelInstance) => Promise<ModelInstance>,
    patchOne: <fields extends keyof ModelInstance>(data: Pick<ModelInstance, id | fields>) => Promise<ModelInstance>,
  }


export interface IModelConfig<ModelInstance> {
    table: string,
    identify: keyof ModelInstance,
} 