/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxrw105mholz9gn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "38uomlhl",
    "name": "bandId",
    "type": "relation",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "9icp7l0hdc2lggk",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxrw105mholz9gn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "38uomlhl",
    "name": "bandId",
    "type": "relation",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "9icp7l0hdc2lggk",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
