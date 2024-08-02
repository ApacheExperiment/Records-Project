/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b499bv9wi60kxqk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "botklrvq",
    "name": "NameGenre",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b499bv9wi60kxqk")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
