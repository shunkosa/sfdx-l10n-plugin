import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { User, UserSelector } from '../../../lib/query';

Messages.importMessagesDirectory(__dirname);

export default class Get extends SfdxCommand {

  public static description = 'Command to set user language/locale';

  public static examples = [
  `$ sfdx l10n:user:get
  {"username":"foo@example.com", "language":"en_US", "locale":"fr_CA"}
  `,
  `$ sfdx l10n:user:get --username test@example.com
  {"username":"test@example.com", "language":"en_US", "locale":"fr_CA"}
  `
  ];

  protected static flagsConfig = {
    username: flags.string({description: 'target username in the org; use this option if you want to change user info other than specified in the --targetusername option.'})
  };

  protected static requiresUsername = true;
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const conn = this.org.getConnection();
    const targetUsername = (this.flags.username) ? this.flags.username : this.org.getUsername() ;
    
    const currentUser: User = await new UserSelector().getUser(conn, targetUsername);
    const outputString: string = `{"username":"${targetUsername}", "language":"${currentUser.LanguageLocaleKey}", "locale":"${currentUser.LocaleSidKey}"}`;
    this.ux.log(outputString);

    return { username: targetUsername, language:currentUser.LanguageLocaleKey, locale:currentUser.LocaleSidKey };
  }
}
