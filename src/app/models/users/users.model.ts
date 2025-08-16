
import createModel from "../../../lib/model/model";


export const usersModel = createModel({
  table: 'users',
  identify: 'id',
})

export const { getAll, addOne, deleteOne, updateOne, patchOne } = usersModel;