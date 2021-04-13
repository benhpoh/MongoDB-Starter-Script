const { MongoClient } = require("mongodb");

// Replace with your MongoDB deployment's connection string.
const connectionString = "mongodb://connectionstring";
const databaseName = "databaseName"
const collectionName = "collectionName"


const getAllDocuments = async () => {
    const { client, collection } = await createMongoClient()
    const response = {}

    try {
        const documents = await collection.find().toArray()
        response.isSuccessful = true
        response.documents = documents
    } catch (error) {
        response.isSuccessful = false,
        response.error = error
    } finally {
        await client.close()
        console.log(response)
        return response
    }
}

const deleteDocument = async (DocumentId) => {
    const { client, collection } = await createMongoClient()
    const response = {}

    try {
        const deleteFilter = {"id": DocumentId}
        const deleteStatus = await collection.deleteMany(deleteFilter)

        if (deleteStatus.deletedCount > 0) {
            response.isSuccessful = true
        } else {
            throw "No documents with matching ID found."
        }
    } catch (error) {
        response.isSuccessful = false,
        response.error = error
    } finally {
        await client.close()
        console.log(response)
        return response
    }
}

const updateDocument = async (documentId, updatedProfile) => {
    const { client, collection } = await createMongoClient()
    const response = {}

    try {
        const updateFilter = {"id": documentId}
        const updateStatus = await collection.replaceOne(updateFilter, updatedProfile)

        if (updateStatus.modifiedCount > 0) {
            response.isSuccessful = true
        } else {
            throw "No documents with matching ID found."
        }
    } catch (error) {
        response.isSuccessful = false,
        response.error = error
    } finally {
        await client.close()
        console.log(response)
        return response
    }
}

const createDocument = async (newProfile) => {
    const { client, collection } = await createMongoClient()
    const response = {}

    try {
        const createStatus = await collection.insertOne(newProfile)

        if (createStatus.insertedCount > 0) {
            response.isSuccessful = true
        } else {
            throw "New document creation unsuccessful"
        }
    } catch (error) {
        response.isSuccessful = false,
        response.error = error
    } finally {
        await client.close()
        console.log(response)
        return response
    }
}

const createMongoClient = async () => {
    const client = new MongoClient(connectionString)
    await client.connect()
    const database = client.db(databaseName)
    const collection = database.collection(collectionName)
    return { client, collection }
}

getAllDocuments()