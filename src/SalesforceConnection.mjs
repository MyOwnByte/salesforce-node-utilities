import jsforce from 'jsforce'

class SalesforceConnection {
    constructor(salesforceUrl, username, password, securityToken) {
        this.salesforceUrl = salesforceUrl;
        this.username = username;
        this.password = password;
        this.securityToken = securityToken;    
    }

    connect = async function() {
        let conn = new jsforce.Connection({ loginUrl: this.salesforceUrl });
        this.userInfo = await conn.login(this.username, this.password + this.securityToken, function (err, userInfo) {
            if (err) {
                console.error("Connection to Salesforce failed.");
                return console.error(err);
            } else {
                console.log("Successfully connected to Salesforce.");
            }
        });
        this.connection = conn;
    }
}

export default SalesforceConnection;