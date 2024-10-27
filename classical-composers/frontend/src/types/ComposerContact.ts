export type ComposerContact = {
  id: number;
  email: string;
  phone: string;
  address: {
    streetAddr: string;
    city: string;
    stateCode: string;
    postalcode: string;
  }
}
