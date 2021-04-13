# MongoDB Starter Script

Basic Node.js starter script for accessing MongoDB and performing CRUD operations with some error handling .

This script will always return a response in the following type format:
```ts
{
  isSuccessful: Boolean;
  documents?: document[];
  error?: String;
}
```

If the Mongo client is being reused with multiple collections / databases, export the `createMongoClient()` method to enhance repeatability.