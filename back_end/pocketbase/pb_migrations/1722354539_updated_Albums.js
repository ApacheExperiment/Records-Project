/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxrw105mholz9gn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6dcsvuk2",
    "name": "searchCount",
    "type": "number",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": 9999,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxrw105mholz9gn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6dcsvuk2",
    "name": "searchCount",
    "type": "number",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": 9999,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
