import { utilService } from "./util.service.js";

export const asyncStorageService = {
  query,
  get,
  post,
  put,
  remove,
};

function query(entityType) {
  const entities = JSON.parse(localStorage.getItem(entityType) || "[]");
  return Promise.resolve(entities);
}

function get(entityType, entityId) {
  return query(entityType).then((entities) => {
    const entity = entities.find((e) => e.id === entityId);

    if (!entity)
      throw new Error(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`,
      );
    return entity;
  });
}

function post(entityType, newEntity) {
  newEntity.id = utilService.makeId();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((e) => e.id === updatedEntity.id);
    if (idx < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`,
      );
    entities[idx] = updatedEntity;
    _save(entityType, entities);
    return updatedEntity;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((e) => e.id === entityId);
    if (idx < 0)
      throw new Error(
        `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`,
      );
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

