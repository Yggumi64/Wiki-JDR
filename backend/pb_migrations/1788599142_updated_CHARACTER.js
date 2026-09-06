/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9d8huuxlh2vqaps")

  // remove
  collection.schema.removeField("ospjvd7e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dz1vkbsb",
    "name": "Affiliation",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vosvg3gbmfzcr4o",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9d8huuxlh2vqaps")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ospjvd7e",
    "name": "Affiliation",
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
  collection.schema.removeField("dz1vkbsb")

  return dao.saveCollection(collection)
})
