import type { Composer } from '@/types/Composer';
import type { ComposerContact } from '@/types/ComposerContact';

export function useComposersApi() {
  const fetchComposers = async (): Promise<Composer[]> => {
    const response = await fetch("http://localhost:8080/composers");
    return response.json();
  };
  const fetchComposer = async (id: number): Promise<Composer> => {
    const response = await fetch(`http://localhost:8080/composers/${id}`);
    return response.json();
  }
  const fetchComposerContact = async (id: number): Promise<ComposerContact> => {
    const response = await fetch(`http://localhost:8080/composers/${id}/contact`);
    return response.json();
  }

  return { fetchComposer, fetchComposers, fetchComposerContact };
}
