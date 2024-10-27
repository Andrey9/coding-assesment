import { EmailPayload } from '../types/email-payload.type';

export interface EmailProviderInterface {
  sendMessage (emailPayload: EmailPayload): Promise<void>;
}
