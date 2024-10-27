import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ComposersService {
  async getComposers() {
    const data = await fs.readFile('composers.json', 'utf-8');

    return JSON.parse(data);
  }

  async getComposer(id: number) {
    const data = await fs.readFile('composers.json', 'utf-8');

    return JSON.parse(data).find(composer => composer.id === id);
  }

  async getComposerContact(id: number) {
    const data = await fs.readFile('contacts.json', 'utf-8');

    return JSON.parse(data).find(composerContact => composerContact.id === id);
  }
}
