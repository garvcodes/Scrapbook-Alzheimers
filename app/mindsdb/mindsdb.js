const MindsDB = require("mindsdb-js-sdk").default;

const DATABASE_NAME = 'scrapbook_js_v3';
const is_connected = false;

let mindsDBConnect = async function() { 
    // Check if already connected
    if (is_connected) {
        console.log('Already connected to MindsDB');
        return true;
    }

    try {
        await MindsDB.connect({
            user: 'ronitrjain@gmail.com',
            password: 'MaggieWalker1!'
        });
        console.log('Connected to MindsDB');
        return true;
    } catch(error) {
        console.log('Failed to authenticate with MindsDB:', error);
        return false;
    }
}

let connecttoMongo = async function() { 
    // Check if database already exists
    if (MindsDB.Databases.getDatabase(DATABASE_NAME)) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        await MindsDB.Databases.createDatabase(
            DATABASE_NAME,
            'mongodb',
            {
                'host': 'mongodb+srv://garv5114:62712810@nailfungus.ocp1zst.mongodb.net/',
                'database': 'share_prompt' 
            }
        );
        console.log('Connected to MongoDB successfully!');
        is_connected = true;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

let main = async function() {
    const isConnected = await mindsDBConnect();
    if (isConnected) {
        await connecttoMongo();
    }
    const db = await MindsDB.Databases.getDatabase(DATABASE_NAME);
    console.log(db);
    
    const query = 'SELECT * FROM scrapbook_js_v3.prompts';
    let prompts = await MindsDB.SQL.runQuery(query);
    console.log(prompts);
    return prompts;
};

prompts = main();

let mlHanlders = async function() {
  const query = 'SHOW HANDLERS WHERE type = \‘ml\'';
  result = await MindsDB.SQL.runQuery(query);
  console.log(result);
}
