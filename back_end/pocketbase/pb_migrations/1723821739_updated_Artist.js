/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9ia168w84c68n2e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b0xhysra",
    "name": "subGenreId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "m7fmknjpshcai6f",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9ia168w84c68n2e")

  // remove
  collection.schema.removeField("b0xhysra")

  return dao.saveCollection(collection)
})
