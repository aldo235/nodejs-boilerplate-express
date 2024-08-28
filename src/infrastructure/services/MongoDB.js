const { MongoClient } = require('mongodb');

class DatabaseMongodb {
    constructor(url) {
        this.client = null;
        this.db = null;
        this.url = url;
    }

    connect = async () => {
        try {
          const uri = this.url;
          this.client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10
          });
    
          await this.client.connect();
          console.log('Connected to MongoDB');
          this.db = this.client.db();
          return this;
        } catch (error) {
          console.error('Failed to connect to MongoDB', error);
          throw error;
        }
      }
    
    getCollection = (name) => {
        return this.db.collection(name);
    }
    
    disconnect = async () => {
        if (this.client) {
          await this.client.close();
          console.log('Disconnected from MongoDB');
        }
    }
}

module.exports = DatabaseMongodb;