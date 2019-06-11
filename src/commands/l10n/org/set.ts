import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { Organization, OrgSelector } from '../../../lib/query';

Messages.importMessagesDirectory(__dirname);

export default class Set extends SfdxCommand {

  public static description = 'Command to set org language/default locale';

  public static examples = [
  `$ sfdx l10n:org:set --lang ja --locale en_US
  Successfully updated foo@example.com org info. Language: en_US -> ja, Default locale: fr_CA -> en_US
  `
  ];

  protected static flagsConfig = {
    lang: flags.string({description: 'language of the org'}),
    locale: flags.string({description: 'default locale of the org'})
  };

  protected static requiresUsername = true;
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const conn = this.org.getConnection();

    const orgToUpdate: Organization = await new OrgSelector().getOrg(conn, this.org);
    const oldLanguageLocaleKey: string = orgToUpdate.LanguageLocaleKey;
    const oldDefaultLocaleSidKey: string = orgToUpdate.DefaultLocaleSidKey;
    orgToUpdate.LanguageLocaleKey = (this.flags.lang) ? this.flags.lang : oldLanguageLocaleKey;
    orgToUpdate.DefaultLocaleSidKey = (this.flags.locale) ? this.flags.locale : oldDefaultLocaleSidKey;
  
    await conn.sobject('Organization').update(orgToUpdate);

    let outputString = `Successfully updated ${this.org.getUsername()} org info. Language: ${oldLanguageLocaleKey}->${orgToUpdate.LanguageLocaleKey}, Default locale: ${oldDefaultLocaleSidKey}->${orgToUpdate.DefaultLocaleSidKey}`;
    this.ux.log(outputString);

    return { orgId: this.org.getOrgId(), outputString };
  }
}
