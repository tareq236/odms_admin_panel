class FetchApiJSON {
  private _baseUrl: string;

  constructor() {
    this._baseUrl = "";
  }

  setBaseUrl(url: string) {
    this._baseUrl = url;
  }

  async fetchData(
    input: string | URL | Request,
    init?: RequestInit | undefined
  ) {
    const response = await fetch(`${this._baseUrl}${input}`, init);
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  }
}

export { FetchApiJSON };
