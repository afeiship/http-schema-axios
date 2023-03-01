import fetch from 'node-fetch';

interface Options {
  baseURL?: string;
  lcId?: string;
  lcKey?: string;
}

const defaults = {
  baseURL: 'https://8alqie7r.lc-cn-n1-shared.com/1.1/classes/options',
  lcId: process.env.LC_ID,
  lcKey: process.env.LC_KEY,
};

export default class {
  private static getHeaders(inOptions: Options) {
    return {
      'X-LC-Id': inOptions.lcId,
      'X-LC-Key': inOptions.lcKey,
      'Content-Type': 'application/json',
    };
  }

  public static async get(inId: string, inOptions?: Options) {
    const options = { ...defaults, ...inOptions };
    const url = `${options.baseURL}/${inId}`;
    const headers = this.getHeaders(options);
    return fetch(url, { headers }).then((res) => res.json());
  }

  public static async set(inId: string, inValue, inOptions?: Options) {
    const options = { ...defaults, ...inOptions };
    const url = `${options.baseURL}/${inId}`;
    const headers = this.getHeaders(options);
    const body = JSON.stringify({ value: inValue });
    return fetch(url, { method: 'PUT', headers, body }).then((res) => res.json());
  }

  public static async val(inId: string, inOptions?: Options) {
    const res = await this.get(inId, inOptions);
    return res?.value;
  }
}
