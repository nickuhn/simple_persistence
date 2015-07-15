#HTTP Server with Simple Persistence

This is a basic REST API Express Server, that stores data in a folder on your hard drive.

###Resource/Storage

The server stores and returns JSON format, and stores the JSON files in a data folder.
The files are stored with note and a number appended to the end based on number of files already existing.

Resource format is: {"author": "name here", "text":"text block here"}

###REST API

GET: Passing in the url: /note/:id the server finds that file and passes it back to the user.

POST: Passing in the url /note and the resource you want saved, the server stores the sent file in the data folder with a unique name.

PUT: Passing in the url /note/:id and the new resource you want saved there, the server overwrites the entire file stored.

PATCH: Passing in the url /note/:id and the new information you want saved in the resource, the server updates the file.

DELETE: Passing in the url /note:id the server deletes the file from storage.


