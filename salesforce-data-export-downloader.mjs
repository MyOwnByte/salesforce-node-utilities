import dotenv from 'dotenv';
import downloadData from './src/handlers/salesforce-data-export-downloader.mjs';

async function init() {
    dotenv.config();

    downloadData([null, null,
        process.env.SalesforceUrl,
        process.env.SalesforceUsername, 
        process.env.SalesforcePassword, 
        process.env.SalesforceSecurityToken,
        process.env.SalesforceDataExportFileDownloader_BackupFolder]
    );
}

init();