
import * as semver from "https://deno.land/x/semver@v1.0.0/mod.ts";

export class VersionInfo {
  private _appName: string;
  private _org: string;
  private _repo: string;
  private _mainFile: string;
  private _currentVersion: string;
  private _message?: string;
  private _errorMessage?: string;

  constructor(
            appName: string,
            org: string,
            repo: string,
            main: string,
            currentVersion: string,
            message?: string,
            errorMessage?: string
  ) {
    this._appName = appName;
    this._org = org;
    this._repo = repo;
    this._mainFile = main;
    this._currentVersion = currentVersion;
    if (message) { this._message = message; }
    if (errorMessage) { this._errorMessage = errorMessage; }
  }

  public get AppName(): string { return this._appName }
  public get Org(): string { return this._org }
  public get Repo(): string { return this._repo }
  public get MainFile(): string { return this._mainFile }
  public get CurrentVersion(): string { return this._currentVersion }
  public get Message(): string | undefined{ return this._message }
  public get ErrorMessage(): string | undefined { return this._errorMessage }
}

export class VersionResult {
  private _result: boolean;
  private _error?: Error;

  constructor(result: boolean, error?: Error) {
    this._result = result;
    if (error) { this._error = error }
  }

  public get Result(): boolean { return this._result }
  public get Error(): Error | undefined { return this._error }
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

  return new VersionResult(result, error);
}