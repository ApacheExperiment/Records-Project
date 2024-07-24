/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9icp7l0hdc2lggk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o0psyg4z",
    "name": "labelId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8uodbez0n0777ov",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9icp7l0hdc2lggk")

  // remove
  collection.schema.removeField("o0psyg4z")

  return dao.saveCollection(collection)
})
