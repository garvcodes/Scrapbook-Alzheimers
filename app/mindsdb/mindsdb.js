const MindsDB = require("mindsdb-js-sdk").default;

let mindsDBConnect = async function() { 
    try {
        await MindsDB.connect({
            user: 'ronitrjain@gmail.com',
            password: 'MaggieWalker1!'
        });
    console.log('connected');
    return true;
    
    } catch(error) {
    // Failed to authenticate
    console.log(error);
    }
}

const connectionParams = {
    'host': 'mongodb+srv://garv5114:62712810@nailfungus.ocp1zst.mongodb.net/',
    'database': 'store_prompts' 
  }
  
let connecttoMongo = async function() { 
  try {
    const mongoDatabase = await MindsDB.Databases.createDatabase(
      'scrapbook_js_db', // Name of the datasource
      'mongodb',          // Type of the database
      connectionParams, // Connection parameters
    );
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    throw(error);
  }
}

let main = (async function() {
    const isConnected = await mindsDBConnect();
    console.log(isConnected);
    if (isConnected) {
        await connecttoMongo();
        }
    
});

let fetchData = async function() {
    try {
        const data = await MindsDB.Databases.getDatabase('scrapbook_js_db').query('SELECT * FROM store_prompts');
        console.log(data);
    } catch (error) {
        throw(error);
    }
}
console.log(fetchData());

  