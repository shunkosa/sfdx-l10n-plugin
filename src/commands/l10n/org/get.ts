import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { Organization, OrgSelector } from '../../../lib/query';

Messages.importMessagesDirectory(__dirname);

export default class Get extends SfdxCommand {

  public static description = 'Command to set org language/default locale';

  public static examples = [
  `$ sfdx l10n:org:get
  {"orgId":"00Dxx000000001234", "language":"ja", "defaultLocale":"en_US"}
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
    const currentOrg: Organization = await new OrgSelector().getOrg(conn, this.org);

    let outputString = `{"orgId":"${this.org.getOrgId()}", "language":"${currentOrg.LanguageLocaleKey}", "defaultLocale":"${currentOrg.DefaultLocaleSidKey}"}`;
    this.ux.log(outputString);

    // Return an object to be displayed with --json
    return { orgId: this.org.getOrgId(), language: currentOrg.LanguageLocaleKey, defaultLocale: currentOrg.DefaultLocaleSidKey };
  }
}
