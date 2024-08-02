/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "b499bv9wi60kxqk",
    "created": "2024-08-02 14:15:54.445Z",
    "updated": "2024-08-02 14:15:54.445Z",
    "name": "Genre",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "botklrvq",
        "name": "Genre",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "snmrsfhy",
        "name": "IconGenre",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("b499bv9wi60kxqk");

  return dao.deleteCollection(collection);
})
