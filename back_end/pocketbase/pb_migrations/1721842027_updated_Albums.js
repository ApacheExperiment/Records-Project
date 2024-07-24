/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxrw105mholz9gn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "quhb8eqn",
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
  const collection = dao.findCollectionByNameOrId("bxrw105mholz9gn")

  // remove
  collection.schema.removeField("quhb8eqn")

  return dao.saveCollection(collection)
})
