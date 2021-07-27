import SalesforceConnection from '../SalesforceConnection.mjs';
import SalesforceDataExportFileDownloader from '../SalesforceDataExportFileDownloader.mjs';

async function downloadData(args) {
    // console.log('args:::', args);
    if(args.length < 6 || args.length > 7) {
        console.log(`Usage: 
            salesforce-data-export-downloader SalesforceUrl SalesforceUsername SalesforcePassword SalesforceSecurityToken [BackupFolderPath]`);
        return 0;
    }
    let backupFolder = args.length == 7 ? args[6] : './backups/';
    let sfConnection = new SalesforceConnection(args[2],args[3],args[4],args[5]);
    await sfConnection.connect();

    let downloader = new SalesforceDataExportFileDownloader(sfConnection.connection.instanceUrl, 
        sfConnection.connection.accessToken, 
        backupFolder);
    downloader.download();
}

export default downloadData;