class FetchApiJSON {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "";
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  async fetchData(
    input: string | URL | Request,
    init?: RequestInit | undefined
  ) {
    const response = await fetch(`${this.baseUrl}${input}`, init);
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  }
}

export { FetchApiJSON };
