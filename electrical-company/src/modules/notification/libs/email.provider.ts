import { injectable } from 'inversify';
import { traceparent } from 'tctx';
import { EmailProviderInterface } from '../interfaces/email.provider.interface';
import { EmailPayload } from '../types/email-payload.type';

@injectable()
export class EmailProvider implements EmailProviderInterface {
  async sendMessage (emailPayload: EmailPayload): Promise<void> {
    try {
      await fetch('https://some-email-api', {
        method: "POST",
        headers: {
          Accept: "application/json, */*",
          "Content-Type": "application/json",
          Traceparent: traceparent.make().toString(),
          Authorization: "Bearer " + process.env.API_KEY
        },
        body: JSON.stringify(emailPayload)
      })
    } catch (error) {
      console.warn('Error sending message to user', error);
    }
  }
}
