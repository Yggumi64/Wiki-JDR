/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9d8huuxlh2vqaps")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d9rwf1um",
    "name": "Skills",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "o4h3zkejk042pms",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2ci4opox",
    "name": "Owner",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9d8huuxlh2vqaps")

  // remove
  collection.schema.removeField("d9rwf1um")

  // remove
  collection.schema.removeField("2ci4opox")

  return dao.saveCollection(collection)
})
