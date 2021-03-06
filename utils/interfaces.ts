export interface IEvent {
  id: string;
  summary: string;
  description: string;
  isOnline: boolean;
  location: string;
  contact: string;
  name: string;
  timezone: string;
  start: number;
  end?: number;
}

export interface IService {
  id: string;
  name: string;
  service: string;
  description: string;
  isFree?: boolean;
  instagram?: string;
  website?: string;
  price?: number;
  whatsapp?: string;
  telegram?: string;
  vkontakte?: string;
  phone?: string;
}

export interface INavigation {
  navigate: (route: string, params?: Object) => void;
}

export interface IRoute {
  params: { service: IService };
}

export interface ICommunity {
  id: string;
  logo: string;
  name: string;
}

export interface IDataContext {
  events: Array<IEvent>;
  services: Array<IService>;
  communities: Array<ICommunity>;
  loadingEvents: boolean;
  loadingServices: boolean;
  storeReminder: (
    value: boolean,
    eventId: string,
    onStored: Function,
    onStoredFailed: Function,
  ) => void;
}
