import { EmailProviderInterface } from '../interfaces/email.provider.interface';
import { EmailPayload } from '../types/email-payload.type';

export class EmailService {
  constructor(
    private emailProvider: EmailProviderInterface,
  ) {}

  public async sendMessage (emailPayload: EmailPayload): Promise<void> {
    if (!emailPayload.to || !emailPayload.to.length) {
      console.warn('Email not sent. Missing recipient.');
      return;
    }
    await this.emailProvider.sendMessage(emailPayload);
  }
}
