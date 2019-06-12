import { Connection, SfdxError, Org } from "@salesforce/core";

export interface User {
    Id: string;
    LanguageLocaleKey: string;
    LocaleSidKey: string;
}

export interface Organization {
    Id: string;
    LanguageLocaleKey: string;
    DefaultLocaleSidKey: string;
}

export class UserSelector {

    async getUser(conn: Connection, targetUsername: string) {
        const query = `SELECT Id, LanguageLocaleKey, LocaleSidKey FROM User WHERE UserName='${targetUsername}'`;
        const queryResult = await conn.query<User>(query);
        if (!queryResult.records || queryResult.records.length <= 0) {
            throw new SfdxError(`User ${targetUsername} was not found in the org.`);
        }
        return queryResult.records[0];
    }

}

export class OrgSelector {
    async getOrg(conn: Connection, org: Org) {
        const query = 'SELECT Id, LanguageLocaleKey, DefaultLocaleSidKey FROM Organization';
        const queryResult = await conn.query<Organization>(query);
        if (!queryResult.records || queryResult.records.length <= 0) {
            throw new SfdxError(`No results found for the org ${org.getOrgId()}`);
        }
        return queryResult.records[0];
    }
}