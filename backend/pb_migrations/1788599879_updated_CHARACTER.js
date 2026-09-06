/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9d8huuxlh2vqaps")

  collection.listRule = "Owner.id = @request.auth.id || @request.auth.isAdmin = true || NPC = true"
  collection.createRule = "Owner.id = @request.auth.id || @request.auth.isAdmin = true"
  collection.updateRule = "Owner.id = @request.auth.id || @request.auth.isAdmin = true"
  collection.deleteRule = "Owner.id = @request.auth.id || @request.auth.isAdmin = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9d8huuxlh2vqaps")

  collection.listRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
