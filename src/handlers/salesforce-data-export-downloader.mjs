import SalesforceConnection from '../SalesforceConnection.mjs';
import SalesforceDataExportFileDownloader from '../SalesforceDataExportFileDownloader.mjs';

async function downloadData(args) {
    const url = args[2];
    const username = args[3];
    const password = args[4];
    const securityToken = args[5];
    const backupFolder = args.length == 7 ? args[6] : './backups/';

    if(args.length < 6 || args.length > 7) {
        console.log(`Usage: 
            salesforce-data-export-downloader SalesforceUrl SalesforceUsername SalesforcePassword SalesforceSecurityToken [BackupFolderPath]`);
        return 0;
    }
    
    let sfConnection = new SalesforceConnection(url, username, password, securityToken);
    await sfConnection.connect();

    let downloader = new SalesforceDataExportFileDownloader(sfConnection.connection.instanceUrl, 
        sfConnection.connection.accessToken, 
        backupFolder);
    downloader.download();
    downloader.asdf();
}

export default downloadData;