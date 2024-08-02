/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxrw105mholz9gn")

  collection.updateRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxrw105mholz9gn")

  collection.updateRule = ""

  return dao.saveCollection(collection)
})
