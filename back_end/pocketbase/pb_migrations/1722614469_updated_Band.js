/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9icp7l0hdc2lggk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c5reij5n",
    "name": "genreId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "b499bv9wi60kxqk",
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
  collection.schema.removeField("c5reij5n")

  return dao.saveCollection(collection)
})
