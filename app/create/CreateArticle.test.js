import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateArticle, { calculateReadingTime } from './page';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../layout/GlobalContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../layout/GlobalContext', () => ({
  useGlobalContext: jest.fn(),
}));

describe('CreateArticle Component', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockRouterPush });
    useGlobalContext.mockReturnValue({
      isAuthenticated: true,
      userId: '123',
      userRole: 'admin',
      userToken: 'test-token',
      apiGateway: 'http://localhost:5000',
      categories: ["méditation", "portrait", "présentation d’œuvre", "concept", "analyse"]
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calcul du temps de lecture avec calculateReadingTime', () => {
    const content = "<p>Ce texte de test comporte une quarantaine de mots pour vérifier que le calcul de temps de lecture fonctionne correctement en se basant sur 200 mots par minute.</p>";
    const readingTime = calculateReadingTime(content);
    expect(readingTime).toBe(1);
  });

  test('affichage du formulaire de création', async () => {
   render(<CreateArticle />);

   expect(screen.getByLabelText(/Titre/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Introduction/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Image de couverture/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Contenu/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Audio/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Mots clés/i)).toBeInTheDocument();
   await waitFor(() => expect(screen.getByLabelText(/Catégorie/i)).toBeInTheDocument());
 });

  test('redirection si utilisateur non authentifié ou non admin', async () => {
  useGlobalContext.mockReturnValue({
    isAuthenticated: false,
    userRole: 'user', 
  });

  render(<CreateArticle />);

  await waitFor(() => {
    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });
});

test("affichage d'un message d'erreur si l'utilisateur non autorisé tente de soumettre", async () => {
 useGlobalContext.mockReturnValue({
   isAuthenticated: true,
   userRole: 'user',
 });

 render(<CreateArticle />);

 fireEvent.submit(screen.getByRole("button", { name: /Créer/i }));

 await waitFor(() => {
   expect(screen.getByText(/Vous n'êtes pas autorisé à créer un article/i)).toBeInTheDocument();
 });
});
});