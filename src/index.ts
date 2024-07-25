export interface LcOptions {
  baseURL?: string;
  lcId?: string;
  lcKey?: string;
}

const defaults = {
  baseURL: process.env.LEANCLOUD_URL,
  lcId: process.env.LEANCLOUD_ID,
  lcKey: process.env.LEANCLOUD_KEY,
};

export default class LC {
  public static headers(inOptions: LcOptions) {
    return {
      'X-LC-Id': inOptions.lcId,
      'X-LC-Key': inOptions.lcKey,
      'Content-Type': 'application/json',
    };
  }

  public static async get(inId: string, inOptions?: LcOptions) {
    const options = { ...defaults, ...inOptions };
    const url = `${options.baseURL}/${inId}`;
    const headers = this.headers(options) as any;
    return fetch(url, { headers }).then((res) => res.json());
  }

  public static async set(inId: string, inValue, inOptions?: LcOptions) {
    const options = { ...defaults, ...inOptions };
    const url = `${options.baseURL}/${inId}`;
    const headers = this.headers(options) as any;
    const body = JSON.stringify({ value: inValue });
    return fetch(url, { method: 'PUT', headers, body }).then((res) => res.json());
  }

  public static async val(inId: string, inOptions?: LcOptions) {
    const res = await this.get(inId, inOptions);
    return res?.value;
  }

  public id: string;
  public options?: LcOptions;

  constructor(inId: string, inOptions?: LcOptions) {
    this.id = inId;
    this.options = inOptions;
  }

  public async get() {
    return LC.get(this.id, this.options);
  }

  public async val() {
    return LC.val(this.id, this.options);
  }

  public async set(inValue) {
    return LC.set(this.id, inValue, this.options);
  }
}
