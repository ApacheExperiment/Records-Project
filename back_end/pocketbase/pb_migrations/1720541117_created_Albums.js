/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "bxrw105mholz9gn",
    "created": "2024-07-09 16:05:17.636Z",
    "updated": "2024-07-09 16:05:17.636Z",
    "name": "Albums",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mgisxdb6",
        "name": "NameAlbum",
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
        "id": "s6czkapb",
        "name": "field",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("bxrw105mholz9gn");

  return dao.deleteCollection(collection);
})
