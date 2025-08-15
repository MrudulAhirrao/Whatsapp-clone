// index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 8000; // Use port 8000 by default

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable the server to parse JSON in request bodies

// --- We will add our API endpoints here later ---

// A simple test route to make sure the server is running
app.get('/', (req, res) => {
  res.send('Hello from the WhatsApp Clone Backend!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/api/conversations', async (req, res) => {
  let client;
  try {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const database = client.db('whatsapp');
    const collection = database.collection('processed_messages');

    // This is the new, more robust pipeline
    const pipeline = [
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: '$conversation_id',
          last_message: { $first: '$content' },
          last_message_timestamp: { $first: '$timestamp' },
          // Collect all available sender names in the group
          all_sender_names: { $push: '$sender_name' }
        }
      },
      // This new stage finds the first valid (non-null) name from the array
      {
        $addFields: {
          sender_name: {
            $first: {
              $filter: {
                input: "$all_sender_names",
                cond: { $ne: ["$$this", null] }
              }
            }
          }
        }
      },
      // Clean up the temporary array field
      { $project: { all_sender_names: 0 } },
      { $sort: { last_message_timestamp: -1 } }
    ];

    const conversations = await collection.aggregate(pipeline).toArray();
    res.json(conversations);

  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    res.status(500).send('Error fetching conversations');
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.get('/api/messages/:conversationId', async (req, res) => {
  let client;
  try {
    // Get the conversationId from the URL parameters
    const conversationId = req.params.conversationId;

    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const database = client.db('whatsapp');
    const collection = database.collection('processed_messages');

    // Find all messages that match the conversationId
    const messages = await collection
      .find({ conversation_id: conversationId })
      .sort({ timestamp: 1 }) // Sort by timestamp oldest to newest
      .toArray();

    res.json(messages);

  } catch (error) {
    console.error('Failed to fetch messages:', error);
    res.status(500).send('Error fetching messages');
  } finally {
    if (client) {
      await client.close();
    }
  }
});


// POST /api/messages - Creates a new message in the database
app.post('/api/messages', async (req, res) => {
  let client;
  try {
    // Get the data sent from the frontend
    const { conversation_id, content } = req.body;

    // Basic validation
    if (!conversation_id || !content) {
      return res.status(400).send('Missing conversation_id or content');
    }

    const newMessage = {
      // We don't need a complex message_id for outgoing messages
      conversation_id: conversation_id,
      content: content,
      direction: 'outgoing', // This message is from us
      status: 'sent',        // Initial status is always 'sent'
      timestamp: new Date()  // Use the current server time
    };

    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const database = client.db('whatsapp');
    const collection = database.collection('processed_messages');

    const result = await collection.insertOne(newMessage);
    
    // Send the newly created message back to the frontend
    res.status(201).json(newMessage);

  } catch (error) {
    console.error('Failed to send message:', error);
    res.status(500).send('Error sending message');
  } finally {
    if (client) {
      await client.close();
    }
  }
});