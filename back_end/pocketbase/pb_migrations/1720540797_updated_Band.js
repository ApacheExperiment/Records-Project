/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9icp7l0hdc2lggk")

  // remove
  collection.schema.removeField("zw8ampqt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pxrsdim9",
    "name": "Links",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t4bed8e5",
    "name": "biography",
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
  const collection = dao.findCollectionByNameOrId("9icp7l0hdc2lggk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zw8ampqt",
    "name": "Links",
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

  // remove
  collection.schema.removeField("pxrsdim9")

  // remove
  collection.schema.removeField("t4bed8e5")

  return dao.saveCollection(collection)
})
