import { useState } from 'react';
import { FaShare, FaSearch, FaSyncAlt } from 'react-icons/fa';
import { TwitterShareButton, WhatsappShareButton } from 'react-share';
import { getRelevantVerse, getRelevantImage } from './services/api';

function App() {
  const [userInput, setUserInput] = useState('');
  const [bibleVerse, setBibleVerse] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBibleVerse = async () => {
    if (!userInput.trim()) {
      setError('Por favor, compartilhe como você está se sentindo.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const verse = await getRelevantVerse(userInput);
      setBibleVerse({
        text: verse.text,
        reference: `${verse.book.name} ${verse.chapter}:${verse.number}`
      });

      const imageUrl = await getRelevantImage([verse.book.name]);
      setBackgroundImage(imageUrl);
    } catch (error) {
      console.error('Error:', error);
      setError('Desculpe, ocorreu um erro ao buscar o versículo. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setBibleVerse(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage || 'https://source.unsplash.com/random/1920x1080/?bible'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl transition-all duration-300">
          <h1 className="text-3xl font-bold text-primary mb-2 text-center">
            Conforto Bíblico
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Compartilhe seus sentimentos e receba uma palavra de conforto
          </p>
          
          <div className="space-y-4">
            <textarea
              className="input min-h-[100px] transition-all duration-200"
              placeholder="Como você está se sentindo hoje?"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isLoading}
            />
            
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <button
                className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                onClick={fetchBibleVerse}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSyncAlt className="animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <FaSearch />
                    Buscar Versículo
                  </>
                )}
              </button>

              {bibleVerse && (
                <button
                  className="btn bg-gray-500 text-white hover:bg-gray-600"
                  onClick={handleReset}
                >
                  Nova Busca
                </button>
              )}
            </div>
          </div>

          {bibleVerse && (
            <div className="mt-8 space-y-4 animate-fade-in">
              <blockquote className="italic text-lg text-gray-700 border-l-4 border-primary pl-4">
                {bibleVerse.text}
                <footer className="text-sm font-medium text-primary mt-2">
                  — {bibleVerse.reference}
                </footer>
              </blockquote>

              <div className="flex gap-2">
                <TwitterShareButton
                  url={window.location.href}
                  title={`${bibleVerse.text} - ${bibleVerse.reference}`}
                >
                  <button className="btn bg-blue-400 text-white hover:bg-blue-500">
                    <FaShare className="inline mr-2" />
                    Twitter
                  </button>
                </TwitterShareButton>

                <WhatsappShareButton
                  url={window.location.href}
                  title={`${bibleVerse.text} - ${bibleVerse.reference}`}
                >
                  <button className="btn bg-green-500 text-white hover:bg-green-600">
                    <FaShare className="inline mr-2" />
                    WhatsApp
                  </button>
                </WhatsappShareButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
