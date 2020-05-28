
export interface IProgram {
  Initialize(...args: any[]): Promise<void>;
  Run(...args: any[]): Promise<void>;
  Main(...args: any[]): Promise<void>;
  Error(e: Error): Promise<void>
  Terminate(): Promise<void>;
}



export class Program implements IProgram {
  constructor(...args: any[]) {
    this.Run(args);
  }

  async Run(...args: any[]) {
    try {
      await this.Initialize(args);
      await this.Main(args);
    }
    catch (e) { await this.Error(e); }
    finally { await this.Terminate(); }
  }

  async Initialize(...args: any[]) { }
  async Main(...args: any[]) { }
  async Error(e: Error) { console.log(e) }
  async Terminate() { }
}