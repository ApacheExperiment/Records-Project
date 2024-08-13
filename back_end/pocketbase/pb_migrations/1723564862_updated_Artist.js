/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9ia168w84c68n2e")

  // remove
  collection.schema.removeField("gsiiqplv")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9ia168w84c68n2e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gsiiqplv",
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
