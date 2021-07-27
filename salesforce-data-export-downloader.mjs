import dotenv from 'dotenv';
import SalesforceConnection from './src/SalesforceConnection.mjs';
import SalesforceDataExportFileDownloader from './src/SalesforceDataExportFileDownloader.mjs';
import exportdata from './src/handlers/salesforce-data-export-downloader.mjs';

async function init() {
    dotenv.config();
    console.log('process.env.Username:::', process.env.SalesforceUsername);
    console.log('process.env.Password:::', process.env.SalesforcePassword);
    console.log('process.env.SecurityToken:::', process.env.SalesforceSecurityToken);
    console.log('process.env.SalesforceDataExportFileDownloader_BackupFolder:::', process.env.SalesforceDataExportFileDownloader_BackupFolder);
    exportdata([null, null,
        process.env.SalesforceUrl,
        process.env.SalesforceUsername, 
        process.env.SalesforcePassword, 
        process.env.SalesforceSecurityToken,
        process.env.SalesforceDataExportFileDownloader_BackupFolder]
    );
    // let sfConnection = new SalesforceConnection(process.env.SalesforceUrl,
    //     process.env.SalesforceUsername, 
    //     process.env.SalesforcePassword, 
    //     process.env.SalesforceSecurityToken);
    // await sfConnection.connect();

    // let downloader = new SalesforceDataExportFileDownloader(sfConnection.connection.instanceUrl, 
    //     sfConnection.connection.accessToken, 
    //     process.env.SalesforceDataExportFileDownloader_BackupFolder);
    // downloader.download();
}

init();