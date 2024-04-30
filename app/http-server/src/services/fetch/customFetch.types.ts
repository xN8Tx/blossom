// Types of available servers
type ServerType = 'file' | 'database';
// Response from servers
type FetchData<T> = {
  message: T;
};
// Headers
type Headers = {
  [x: string]: string;
};

export type { Headers, FetchData, ServerType };
