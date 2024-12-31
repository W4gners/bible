import axios from 'axios';

const bibleApi = axios.create({
  baseURL: 'https://www.abibliadigital.com.br/api',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR1ZSBEZWMgMzEgMjAyNCAwMToxMTo1NSBHTVQtMDMwMCAoQnJhc2lsaWEgU3RhbmRhcmQgVGltZSkiLCJuYW1lIjoiQ29uc2VsaG9zIEJpYmxpY29zIn0.YourActualToken'
  }
});

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Authorization': 'Client-ID YOUR_UNSPLASH_API_KEY'
  }
});

// Map of feelings/situations to relevant Bible topics
const feelingsMap = {
  'ansioso': ['anxiety', 'peace', 'trust'],
  'triste': ['comfort', 'hope', 'joy'],
  'medo': ['courage', 'faith', 'protection'],
  'gratidão': ['thankfulness', 'praise', 'blessing'],
  'alegria': ['joy', 'celebration', 'happiness'],
  'perdido': ['guidance', 'direction', 'wisdom'],
  'culpado': ['forgiveness', 'mercy', 'grace'],
  'sozinho': ['companionship', 'love', 'presence'],
  // Add more mappings as needed
};

// Helper function to analyze text and return relevant topics
const analyzeText = (text) => {
  const lowercaseText = text.toLowerCase();
  let relevantTopics = [];
  
  for (const [feeling, topics] of Object.entries(feelingsMap)) {
    if (lowercaseText.includes(feeling)) {
      relevantTopics.push(...topics);
    }
  }
  
  // If no specific feelings found, return default topics
  return relevantTopics.length > 0 ? relevantTopics : ['hope', 'comfort', 'love'];
};

// Get random verse based on topics
export const getRelevantVerse = async (userText) => {
  try {
    const topics = analyzeText(userText);
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    // Search for verses using the Bible Digital API
    const response = await bibleApi.get('/verses/search', {
      params: {
        version: 'nvi',
        search: randomTopic,
        limit: 10
      }
    });

    if (response.data && response.data.verses && response.data.verses.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.data.verses.length);
      return response.data.verses[randomIndex];
    }
    
    throw new Error('No verses found');
  } catch (error) {
    console.error('Error fetching Bible verse:', error);
    throw error;
  }
};

// Get relevant image from Unsplash
export const getRelevantImage = async (topics) => {
  try {
    const query = topics.join(' ') + ' bible spiritual';
    const response = await unsplashApi.get('/photos/random', {
      params: {
        query,
        orientation: 'landscape'
      }
    });
    
    return response.data.urls.regular;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};
