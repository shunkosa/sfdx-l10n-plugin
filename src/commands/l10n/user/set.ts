import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { User, UserSelector } from '../../../lib/query';

Messages.importMessagesDirectory(__dirname);

export default class Set extends SfdxCommand {

  public static description = 'Command to set user language/locale';

  public static examples = [
  `$ sfdx l10n:user:set --lang ja --locale en_US
  Successfully updated foo@example.com user info. Language: en_US -> ja, Locale: fr_CA -> en_US
  `,
  `$ sfdx l10n:user:set sfdx l10n:user:set --lang ja --locale en_US --username test@example.com -u foo@example.com
  Successfully updated foo@example.com user info. Language: en_US -> ja, Locale: fr_CA -> en_US
  `
  ];

  protected static flagsConfig = {
    lang: flags.string({description: 'language of the user' }),
    locale: flags.string({description: 'locale of the user' }),
    username: flags.string({description: 'target username in the org; use this option if you want to change user info other than specified in the --targetusername option.'})
  };

  protected static requiresUsername = true;
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const conn = this.org.getConnection();
    const targetUsername = (this.flags.username) ? this.flags.username : this.org.getUsername() ;
    
    const userToUpdate: User = await new UserSelector().getUser(conn, targetUsername);
    const oldLanguageLocaleKey: string = userToUpdate.LanguageLocaleKey;
    const oldLocaleSidKey: string = userToUpdate.LocaleSidKey;
    userToUpdate.LanguageLocaleKey = (this.flags.lang) ? this.flags.lang : oldLanguageLocaleKey;
    userToUpdate.LocaleSidKey = (this.flags.locale) ? this.flags.locale : oldLocaleSidKey;
  
    await conn.sobject('User').update(userToUpdate);

    const outputString: string = `Successfully updated ${targetUsername} user info. Language: ${oldLanguageLocaleKey}->${userToUpdate.LanguageLocaleKey}, Locale: ${oldLocaleSidKey}->${userToUpdate.LocaleSidKey}`;
    this.ux.log(outputString);

    // Return an object to be displayed with --json
    return { userId: userToUpdate.Id, outputString };
  }
}
