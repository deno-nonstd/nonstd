
import * as semver from "https://deno.land/x/semver@v1.0.0/mod.ts";


export interface VersionResult {
  readonly Result: boolean;
  readonly Error?: Error;
}

export interface VersionInfo {
  AppName: string;
  Org: string;
  Repo: string;
  MainFile: string;
  CurrentVersion: string;
  Message?: string;
  ErrorMessage?: string;
}


export async function checkIfNewer(info: VersionInfo): Promise<VersionResult> {
  let result: boolean = false;
  let error: Error | undefined;

  try {
    const tags = await fetch(`https://api.github.com/repos/${info.Org}/${info.Repo}/tags`);
    const json = await tags.json();
    const next = json[0].name;

    if (semver.gt(next, info.CurrentVersion)) {
      result = true;

      if (info.Message) {
        console.log(info.Message);
      }
      else {
        console.log(`
  The current version of ${info.AppName} is ${info.CurrentVersion}.  Update ${next} is available for immediate 
   install.  To update ${info.AppName}, type the following at the command line:
      
 $ deno install -Af -n ${info.AppName} https://deno.land/x/${info.Org}/${info.Repo}/${info.MainFile}
        `);
      }
    }
  }
  catch (e) {
    error = e;
    if (info.ErrorMessage) {
      console.log(info.ErrorMessage);
    }
    else {
      console.log(`Warning: Attempt to check for latest version of ${info.AppName} failed.`);
    }
  }

  return { Result: result, Error: error } as VersionResult;
}