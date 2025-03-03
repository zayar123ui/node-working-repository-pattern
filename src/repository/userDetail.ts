import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, ModelTypes, ModelScalarFields, MODELS_NAME } from './prisma-repo';

// This type will be used if you want to extends the functions in UserDetail Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.USER_DETAIL]['Where'];
type Select = ModelTypes[typeof MODELS_NAME.USER_DETAIL]['Select'];
type Include = ModelTypes[typeof MODELS_NAME.USER_DETAIL]['Include'];
type Create = ModelTypes[typeof MODELS_NAME.USER_DETAIL]['Create'];
type Update = ModelTypes[typeof MODELS_NAME.USER_DETAIL]['Update'];
type Cursor = ModelTypes[typeof MODELS_NAME.USER_DETAIL]['Cursor'];
type Order = ModelTypes[typeof MODELS_NAME.USER_DETAIL]['Order'];
type Delegate = ModelTypes[typeof MODELS_NAME.USER_DETAIL]['Delegate'];
type GroupBy = ModelTypes[typeof MODELS_NAME.USER_DETAIL]['GroupBy'];
type Scalar = ModelScalarFields<typeof MODELS_NAME.USER_DETAIL>;
type Model = ModelStructure[typeof MODELS_NAME.USER_DETAIL];
/*  eslint-enable @typescript-eslint/no-unused-vars */


class UserDetail extends BaseRepository(MODELS_NAME.USER_DETAIL) {
}

export default UserDetail
