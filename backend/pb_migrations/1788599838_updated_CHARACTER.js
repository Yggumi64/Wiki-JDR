/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9d8huuxlh2vqaps")

  collection.viewRule = "Owner.id = @request.auth.id || @request.auth.isAdmin = true || NPC = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9d8huuxlh2vqaps")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
