import fetch from 'node-fetch';

interface Options {
  baseURL?: string;
  lcId?: string;
  lcKey?: string;
}

const defaults = {
  baseURL: process.env.LC_URL,
  lcId: process.env.LC_ID,
  lcKey: process.env.LC_KEY,
};

export default class LC {
  public static headers(inOptions: Options) {
    return {
      'X-LC-Id': inOptions.lcId,
      'X-LC-Key': inOptions.lcKey,
      'Content-Type': 'application/json',
    };
  }

  public static async get(inId: string, inOptions?: Options) {
    const options = { ...defaults, ...inOptions };
    const url = `${options.baseURL}/${inId}`;
    const headers = this.headers(options);
    return fetch(url, { headers }).then((res) => res.json());
  }

  public static async set(inId: string, inValue, inOptions?: Options) {
    const options = { ...defaults, ...inOptions };
    const url = `${options.baseURL}/${inId}`;
    const headers = this.headers(options);
    const body = JSON.stringify({ value: inValue });
    return fetch(url, { method: 'PUT', headers, body }).then((res) => res.json());
  }

  public static async val(inId: string, inOptions?: Options) {
    const res = await this.get(inId, inOptions);
    return res?.value;
  }

  private id: string;
  private options?: Options;

  constructor(inId: string, inOptions?: Options) {
    this.id = inId;
    this.options = inOptions;
  }

  public async get() {
    return LC.get(this.id, this.options);
  }

  public async val() {
    return LC.val(this.id, this.options);
  }

  public set(inValue) {
    LC.set(this.id, inValue, this.options);
  }
}
