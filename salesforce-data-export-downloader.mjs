import dotenv from 'dotenv';
import downloadData from './src/handlers/salesforce-data-export-downloader.mjs';

async function init() {
    dotenv.config();
    console.log('process.env.Username:::', process.env.SalesforceUsername);
    console.log('process.env.Password:::', process.env.SalesforcePassword);
    console.log('process.env.SecurityToken:::', process.env.SalesforceSecurityToken);
    console.log('process.env.SalesforceDataExportFileDownloader_BackupFolder:::', process.env.SalesforceDataExportFileDownloader_BackupFolder);
    downloadData([null, null,
        process.env.SalesforceUrl,
        process.env.SalesforceUsername, 
        process.env.SalesforcePassword, 
        process.env.SalesforceSecurityToken,
        process.env.SalesforceDataExportFileDownloader_BackupFolder]
    );
}

init();