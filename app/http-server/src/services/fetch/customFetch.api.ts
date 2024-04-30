import type { FetchData, Headers, ServerType } from './customFetch.types';

class CustomFetch {
  private readonly baseURL: string | undefined;
  private headers: Headers = {
    'Content-Type': 'application/json',
  };

  constructor(server: ServerType, customHeaders?: Headers) {
    // Setup base url
    if (server === 'file') this.baseURL = process.env.FILE_SERVER_URL;
    if (server === 'database') this.baseURL = process.env.DATABASE_SERVER_URL;
    if (!this.baseURL)
      throw new Error(`CustomFetch URL is empty. Server type: ${server}`);
    // Setup headers
    if (!customHeaders) return this;
    this.headers = {
      ...this.headers,
      ...customHeaders,
    };
  }

  async get<T>(url: string, headers: Headers = {}): Promise<T> {
    try {
      const customHeaders = {
        method: 'GET',
        headers: {
          ...this.headers,
          ...headers,
        },
      };

      const response = await fetch(`${this.baseURL}${url}`, customHeaders);

      if (response.status !== 200) {
        throw new Error(
          `Fetch status: ${response.status}. Response: ${JSON.stringify(response)}`,
        );
      }

      const data: FetchData<T> = await response.json();
      return data.message;
    } catch (error) {
      throw new Error(
        `Error in get method in fileFetch. ${JSON.stringify(error)}`,
      );
    }
  }

  async post<T>(url: string, body: unknown, headers: Headers = {}): Promise<T> {
    try {
      const customHeaders = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...this.headers,
          ...headers,
        },
      };

      const response = await fetch(`${this.baseURL}${url}`, customHeaders);

      if (response.status !== 200) {
        throw new Error(
          `Fetch status: ${response.status}. Response: ${JSON.stringify(response)}`,
        );
      }

      const data: FetchData<T> = await response.json();
      return data.message;
    } catch (error) {
      throw new Error(
        `Error in get method in fileFetch. ${JSON.stringify(error)}`,
      );
    }
  }

  async put<T>(
    url: string,
    body: unknown,
    headers: Headers = {},
  ): Promise<T | Response> {
    try {
      const customHeaders = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          ...this.headers,
          ...headers,
        },
      };

      const response = await fetch(`${this.baseURL}${url}`, customHeaders);

      if (response.status !== 200) {
        throw new Error(
          `Fetch status: ${response.status}. Response: ${JSON.stringify(response)}`,
        );
      }

      const data: FetchData<T> = await response.json();
      return data.message;
    } catch (error) {
      throw new Error(
        `Error in get method in fileFetch. ${JSON.stringify(error)}`,
      );
    }
  }

  async delete<T>(url: string): Promise<T | Response> {
    try {
      const customHeaders = {
        method: 'DELETE',
      };

      const response = await fetch(`${this.baseURL}${url}`, customHeaders);

      if (response.status !== 200) {
        throw new Error(
          `Fetch status: ${response.status}. Response: ${JSON.stringify(response)}`,
        );
      }

      const data: FetchData<T> = await response.json();
      return data.message;
    } catch (error) {
      throw new Error(
        `Error in get method in fileFetch. ${JSON.stringify(error)}`,
      );
    }
  }
}

export default CustomFetch;
