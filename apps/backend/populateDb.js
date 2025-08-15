
require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const payloadsFolderPath = path.join(__dirname, 'payloads');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');

    const database = client.db('whatsapp');
    const collection = database.collection('processed_messages');
    await collection.deleteMany({});
    console.log('Cleared existing messages from collection.');

    const files = fs.readdirSync(payloadsFolderPath);
    const messageFiles = files.filter(f => f.includes('message'));
    const statusFiles = files.filter(f => f.includes('status'));

    console.log(`Processing ${messageFiles.length} message files...`);
    for (const file of messageFiles) {
      const filePath = path.join(payloadsFolderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      if (!fileContent) continue;
      const payload = JSON.parse(fileContent);

      const value = payload?.metaData?.entry?.[0]?.changes?.[0]?.value;

      if (!value || !value.messages || !value.contacts) {
        console.warn(`Warning: Skipping file with unexpected structure: ${file}`);
        continue;
      }

      const contact = value.contacts[0];
      const message = value.messages[0];

      const documentToInsert = {
        message_id: message.id,
        conversation_id: contact.wa_id,
        sender_name: contact.profile.name,
        content: message.text.body,
        type: message.type,
        direction: 'incoming',
        timestamp: new Date(parseInt(message.timestamp) * 1000),
        status: 'sent',
      };
      await collection.insertOne(documentToInsert);
    }
    console.log('All new messages have been inserted.');


    console.log(`Processing ${statusFiles.length} status files...`);
    for (const file of statusFiles) {
        const filePath = path.join(payloadsFolderPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        if (!fileContent) continue;
        const payload = JSON.parse(fileContent);

        const statusUpdate = payload?.metaData?.entry?.[0]?.changes?.[0]?.value?.statuses?.[0];

        if (!statusUpdate) {
            console.warn(`Warning: Skipping file with unexpected status structure: ${file}`);
            continue;
        }

        await collection.updateOne(
            { message_id: statusUpdate.id },
            { $set: { status: statusUpdate.status } }
        );
    }
    console.log('All message statuses have been updated.');
    console.log('Database population complete! ✅');

  } catch (error) {
      console.error("An error occurred:", error);
  }
  finally {
    await client.close();
  }
}

run();