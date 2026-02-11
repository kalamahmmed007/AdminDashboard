// src/services/users.js
import { UsersAPI } from "../services/api";

export const UsersService = {
    getCurrent: () => UsersAPI.getMe(),
    updateProfile: (payload) => UsersAPI.updateMe(payload),
    list: (params) => UsersAPI.list(params),
    get: (id) => UsersAPI.get(id),
    create: (payload) => UsersAPI.create(payload),
    update: (id, payload) => UsersAPI.update(id, payload),
    delete: (id) => UsersAPI.delete(id),
};
