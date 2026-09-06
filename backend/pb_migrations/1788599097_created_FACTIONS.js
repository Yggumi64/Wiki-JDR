/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vosvg3gbmfzcr4o",
    "created": "2026-09-05 09:04:57.932Z",
    "updated": "2026-09-05 09:04:57.932Z",
    "name": "FACTIONS",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ifkcwptk",
        "name": "Name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "9chevro6",
        "name": "Description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vosvg3gbmfzcr4o");

  return dao.deleteCollection(collection);
})
