# Salesforce Node Utilities salesforce-node-utilities

This is a collection of node utilities that can be used while working on Salesforce projects.

## Library

### SalesforceConnection.js
Encapsulates jsForce Salesforce connection.
Connection information must be specified at .env file:
SalesforceUsername, SalesforcePassword, SalesforceSecurityToken, SalesforceUrl


### SalesforceDataExportFileDownloader.js
Salesforce doesn't provide a way to download all zip files that are part of a monthly or weekly data export. 
Instead admins have to manually click file by file.
This script downloads data export .zip files into a download directory specified in .env file as "SalesforceDataExportFileDownloader_BackupFolder" (For WSL use notation "/mnt/c/")

## Usage

**Node:**
1. Rename .env-example file as .env
2. Fill information in .env file
3. Execute:<br/>
`node salesforce-data-export-downloader.mjs`

**Bash:**
1. Install package as global:<br/>
`npm install -g salesforce-node-utilities`
2. Execute:<br/>
`salesforce-data-export-downloader SalesforceUrl SalesforceUsername SalesforcePassword SalesforceSecurityToken [BackupFolderPath]`
