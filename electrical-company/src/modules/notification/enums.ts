export enum MobileCarrier {
  Verizon = 'verizon',
  AtAndT = 'at&t',
  TMobile = 'tmobile',
}
 export const MobileCarrierEmailDomains = {
  [MobileCarrier.Verizon]: '@vtext.com',
  [MobileCarrier.AtAndT]: '@text.att.net',
  [MobileCarrier.TMobile]: '@tmomail.net',
 }
