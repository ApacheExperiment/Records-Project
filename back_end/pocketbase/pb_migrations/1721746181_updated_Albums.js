/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxrw105mholz9gn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d5ar7zb9",
    "name": "field",
    "type": "json",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxrw105mholz9gn")

  // remove
  collection.schema.removeField("d5ar7zb9")

  return dao.saveCollection(collection)
})
