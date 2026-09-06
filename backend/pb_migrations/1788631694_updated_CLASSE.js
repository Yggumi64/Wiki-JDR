/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2kj64g6nc1dnykf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zfghe720",
    "name": "Requirement",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "2kj64g6nc1dnykf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2kj64g6nc1dnykf")

  // remove
  collection.schema.removeField("zfghe720")

  return dao.saveCollection(collection)
})
