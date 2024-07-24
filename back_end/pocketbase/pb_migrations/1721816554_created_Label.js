/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8uodbez0n0777ov",
    "created": "2024-07-24 10:22:34.316Z",
    "updated": "2024-07-24 10:22:34.316Z",
    "name": "Label",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yhbyul1q",
        "name": "NameLabel",
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
  const collection = dao.findCollectionByNameOrId("8uodbez0n0777ov");

  return dao.deleteCollection(collection);
})
