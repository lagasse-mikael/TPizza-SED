import mongoose from 'mongoose';
import chalk from 'chalk';
import '../../env.js';


export default async () => {
    
    //const urlTemp = "mongodb+srv://risk:22battle@space-api.52fkj.mongodb.net/space-api?authSource=admin&replicaSet=atlas-7jpjdn-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"

    const url = process.env.DATABASE;
    console.log(chalk.green(`[MONGO] - Establish new connection with url: ${url}`));

    try {
        await mongoose.connect(url);
        console.log(chalk.green(`[MONGO] - Connected to: ${url}`)); 
    } catch(err) {
        console.log(chalk.red(`[MONGO] - Cannot connect to: ${url}\n ${err} ... \n Exiting`));
        process.exit(1);
    }
    
}