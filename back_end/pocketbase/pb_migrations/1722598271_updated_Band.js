/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9icp7l0hdc2lggk")

  collection.indexes = [
    "CREATE INDEX `idx_4bw8v0Z` ON `Band` (`NameBand`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9icp7l0hdc2lggk")

  collection.indexes = []

  return dao.saveCollection(collection)
})
